import { useState, useCallback, useEffect, useMemo } from 'react';
import { db } from '../firebaseConfig';
import type { Progress, DrillPerformance, Lesson, User } from '../types';
import { getDrillId, getPerformanceTier } from '../utils/helpers';
import { useToast } from '../context/ToastContext';
import { memoize } from '../utils/performance';

// Check if Firebase is available
const isFirebaseAvailable = memoize(() => {
  try {
    return db && typeof db.collection === 'function';
  } catch (error) {
    console.warn('Firebase not available:', error);
    return false;
  }
});

const useProgress = (user: User | null) => {
  const [progress, setProgress] = useState<Progress>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const firebaseAvailable = useMemo(() => isFirebaseAvailable(), []);
  const { addToast } = useToast();

  // Load progress from Firestore when user changes - memoized to prevent unnecessary calls
  useEffect(() => {
    if (!user || user.uid === 'guest' || !firebaseAvailable) {
      // For guests or when Firebase is unavailable, use local state only
      setProgress({});
      setIsLoaded(true);
      return;
    }

    const loadProgress = async () => {
      setIsLoaded(false);
      try {
        const progressDocRef = db.collection('progress').doc(user.uid);
        const docSnap = await progressDocRef.get();
        if (docSnap.exists) {
          const newProgress = docSnap.data() as Progress;
          // Only update if the progress actually changed
          setProgress(prevProgress => {
            const progressChanged = JSON.stringify(prevProgress) !== JSON.stringify(newProgress);
            return progressChanged ? newProgress : prevProgress;
          });
        } else {
          setProgress(prevProgress => {
            return Object.keys(prevProgress).length > 0 ? {} : prevProgress;
          });
        }
      } catch (error) {
        console.error("Failed to load progress from Firestore", error);
        setProgress(prevProgress => {
          return Object.keys(prevProgress).length > 0 ? {} : prevProgress;
        });
      } finally {
        setIsLoaded(true);
      }
    };

    loadProgress();
  }, [user?.uid, firebaseAvailable]); // Only depend on user.uid, not the entire user object

  const saveDrillPerformance = useCallback((lesson: Lesson, drillIndex: number, wpm: number, accuracy: number) => {
    const drillId = getDrillId(lesson, drillIndex);
    const tier = getPerformanceTier(wpm, accuracy);
    const timestamp = Date.now();
    
    const newPerformance: DrillPerformance = { wpm, accuracy, tier, timestamp };
    
    setProgress(currentProgress => {
      const existingPerformance = currentProgress[drillId];

      const isNewScoreBetter = !existingPerformance ||
        (tier === 'mastered' && existingPerformance.tier !== 'mastered') ||
        (tier === 'proficient' && existingPerformance.tier === 'needs-practice') ||
        (tier === existingPerformance.tier && wpm > existingPerformance.wpm);

      if (isNewScoreBetter) {
        const updatedProgress = { ...currentProgress, [drillId]: newPerformance };
        
        // Check for drill completion
        const isFirstCompletion = !existingPerformance;
        const achievedMastery = tier === 'mastered' && existingPerformance?.tier !== 'mastered';
        
        // Check for chapter completion
        const chapterNumber = lesson.id.split('-')[0].replace('opt-chapter-', '');
        const chapterProgress = Object.keys(updatedProgress)
          .filter(id => id.startsWith(`${chapterNumber}-`))
          .map(id => updatedProgress[id]);
        
        const totalDrillsInChapter = 15; // Each chapter has 15 drills
        const completedDrills = chapterProgress.length;
        const masteredDrills = chapterProgress.filter(p => p.tier === 'mastered').length;
        const isChapterCompleted = completedDrills === totalDrillsInChapter;
        const isChapterMastered = masteredDrills === totalDrillsInChapter;

        // Show appropriate success messages
        if (achievedMastery) {
          addToast(`🎉 Drill ${drillIndex + 1} mastered! WPM: ${wpm}, Accuracy: ${accuracy}%`, 'success');
        } else if (isFirstCompletion) {
          addToast(`✅ Drill ${drillIndex + 1} completed! WPM: ${wpm}, Accuracy: ${accuracy}%`, 'success');
        }

        // Chapter completion messages
        if (isChapterCompleted && completedDrills === totalDrillsInChapter) {
          const chapterNumber = lesson.id.split('-')[0];
          addToast(`🏆 Chapter ${chapterNumber} completed! All 15 drills finished!`, 'success');
        }
        
        if (isChapterMastered && masteredDrills === totalDrillsInChapter) {
          const chapterNumber = lesson.id.split('-')[0];
          addToast(`👑 Chapter ${chapterNumber} MASTERED! Perfect performance on all drills!`, 'success');
        }
        
        // Only try to save to cloud if Firebase is available and user is authenticated
        if (firebaseAvailable && user && user.uid !== 'guest') {
          const progressDocRef = db.collection('progress').doc(user.uid);
          progressDocRef.set({ [drillId]: newPerformance }, { merge: true })
            .then(() => {
              if (!isFirstCompletion && !achievedMastery) {
                addToast('Progress saved to cloud!', 'success');
              }
            })
            .catch(error => {
              console.error("Failed to save progress to Firestore", error);
              addToast('Progress saved locally!', 'info');
            });
        }
        
        return updatedProgress;
      } else {
        // Show encouragement for attempts that don't improve the score
        if (existingPerformance) {
          addToast(`Keep practicing! Best: ${existingPerformance.wpm} WPM, ${existingPerformance.accuracy}%`, 'info');
        }
      }
      
      return currentProgress; // No change, return same reference
    });
  }, [user?.uid, addToast, firebaseAvailable]);

  const resetProgress = useCallback(async () => {
    setProgress(currentProgress => {
      // Only update if there's actually progress to reset
      if (Object.keys(currentProgress).length === 0) {
        return currentProgress;
      }
      return {};
    });
    
    addToast('Your progress has been reset.', 'info');
    
    // Only try to delete from cloud if Firebase is available and user is authenticated
    if (firebaseAvailable && user && user.uid !== 'guest') {
      try {
        const progressDocRef = db.collection('progress').doc(user.uid);
        await progressDocRef.delete();
      } catch (error) {
        console.error("Failed to reset progress in Firestore", error);
        // Progress is already reset locally, so we don't need to show error
      }
    }
  }, [user?.uid, addToast, firebaseAvailable]); // Only depend on user.uid

  // Memoize the return object to prevent unnecessary re-renders
  const returnValue = useMemo(() => ({
    progress,
    saveDrillPerformance,
    resetProgress,
    isLoaded
  }), [progress, saveDrillPerformance, resetProgress, isLoaded]);

  return returnValue;
};

export default useProgress;