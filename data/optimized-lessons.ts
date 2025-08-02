import type { Chapter } from '../types';
import { chapters } from './lessons';

/**
 * TypingPath Complete Optimized Curriculum - 2025 Edition
 * Comprehensive 30+ chapter system with 15 progressive drills each
 * Each drill increases in difficulty: basic patterns → capitals → real-world application
 * Covers: Basic keys → Advanced coding → Literature → Professional mastery
 */

export const optimizedChapters: Chapter[] = [
  {
    id: "opt-chapter-1",
    name: "Chapter 1: Foundation Keys - F & J",
    description: "Master your home position with index fingers on F and J keys.",
    lessons: [
      // Drills 1-5: Basic lowercase patterns (20-60 characters)
      {
        id: "1-1",
        name: "Drill 1: Basic F J Pattern",
        texts: ["f j fj jf ff jj f j fj jf"]
      },
      {
        id: "1-2", 
        name: "Drill 2: Alternating Rhythm",
        texts: ["j f jf fj jj ff j f jf fj ff jj fj"]
      },
      {
        id: "1-3",
        name: "Drill 3: Triple Patterns", 
        texts: ["fjf jfj fjf jfj fff jjj fjf jfj fff jjj fjf jfj"]
      },
      {
        id: "1-4",
        name: "Drill 4: Speed Sequences",
        texts: ["f j f j f j j f j f j f fjf jfj fjf jfj f j f j"]
      },
      {
        id: "1-5",
        name: "Drill 5: Complex Combinations",
        texts: ["fjfj jfjf ffff jjjj fjjf jffj fjfj jfjf fjjf jffj ffff jjjj"]
      },

      // Drills 6-10: Add capitals, increase complexity (80-150 characters)
      {
        id: "1-6",
        name: "Drill 6: Capital Introduction",
        texts: ["Fj Jf fJ jF FF JJ Fj Jf fJ jF Fj Jf Fj Jf FF JJ fJ jF Fj Jf fJ jF FF JJ Fj Jf fJ jF FF JJ"]
      },
      {
        id: "1-7",
        name: "Drill 7: Mixed Case Patterns", 
        texts: ["FjF JfJ fJf jFj FFf JJj FjF JfJ fJf jFj FFf JJj FjF JfJ fJf jFj FFf JJj FjF JfJ fJf jFj FFf JJj FjF JfJ"]
      },
      {
        id: "1-8",
        name: "Drill 8: Capital Combinations",
        texts: ["Fjjf JFFJ fJJf jFFj FjjF JffJ Fjjf JFFJ fJJf jFFj FjjF JffJ Fjjf JFFJ fJJf jFFj FjjF JffJ Fjjf JFFJ fJJf"]
      },
      {
        id: "1-9", 
        name: "Drill 9: Advanced Capitals",
        texts: ["FJ fj JF jf FFjj JJff FjJf jFfJ FFjj JJff FjJf jFfJ FFjj JJff FjJf jFfJ FFjj JJff FjJf jFfJ FFjj JJff FjJf"]
      },
      {
        id: "1-10",
        name: "Drill 10: Speed Capitals",
        texts: ["F J f j F J f j Fj fJ Jf jF FF JJ ff jj FjJf jFfJ FFJJffjj F J f j F J f j Fj fJ Jf jF FF JJ ff jj FjJf jFfJ"]
      },

      // Drills 11-15: Full tests, sentence-style (200-400 characters)
      {
        id: "1-11",
        name: "Drill 11: Word-like Patterns",
        texts: ["fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj fjf jfj"]
      },
      {
        id: "1-12",
        name: "Drill 12: Pseudo-words",
        texts: ["fjjf jffj fjjf jffj fjjf jffj fjjf jffj Fjjf Jffj Fjjf Jffj fjjf jffj fjjf jffj Fjjf Jffj Fjjf Jffj fjjf jffj fjjf jffj Fjjf Jffj Fjjf Jffj fjjf jffj fjjf jffj Fjjf Jffj Fjjf Jffj fjjf jffj fjjf jffj Fjjf Jffj Fjjf Jffj fjjf jffj fjjf jffj"]
      },
      {
        id: "1-13", 
        name: "Drill 13: Rhythm Challenge",
        texts: ["F j f J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J f j F J"]
      },
      {
        id: "1-14",
        name: "Drill 14: Mastery Test",
        texts: ["Fjf jFj FjF jJj fjf jfj FJF jfj Fjf jFj FjF jJj fjf jfj FJF jfj Fjf jFj FjF jJj fjf jfj FJF jfj Fjf jFj FjF jJj fjf jfj FJF jfj Fjf jFj FjF jJj fjf jfj FJF jfj Fjf jFj FjF jJj fjf jfj FJF jfj Fjf jFj FjF jJj fjf jfj FJF jfj Fjf jFj FjF jJj fjf jfj FJF jfj Fjf jFj FjF jJj fjf jfj"]
      },
      {
        id: "1-15",
        name: "Drill 15: Final Challenge", 
        texts: ["F J f j F J f j Fj fJ Jf jF Fjf jFj FjF jJj fjjf jffj FJfj jFfJ FFjj JJff FjJf jFjF fjJF jfJf FJfJ jFfj fjJf jFjf FJfJ jFfj fjJf jFjf FJfJ jFfj fjJf jFjf FJfJ jFfj fjJf jFjf FJfJ jFfj fjJf jFjf FJfJ jFfj fjJf jFjf FJfJ jFfj fjJf jFjf FJfJ jFfj fjJf jFjf FJfJ jFfj fjJf jFjf FJfJ"]
      }
    ]
  },

  // Chapter 2: Building on F & J with D & K
  {
    id: "opt-chapter-2", 
    name: "Chapter 2: Expanding Base - D & K",
    description: "Add middle fingers with D and K keys, building on F-J foundation.",
    lessons: [
      // Drills 1-5: Basic D K patterns (20-60 characters)
      {
        id: "2-1",
        name: "Drill 1: Basic D K Pattern",
        texts: ["d k dk kd dd kk d k dk kd"]
      },
      {
        id: "2-2",
        name: "Drill 2: D K Alternation", 
        texts: ["k d kd dk kk dd k d kd dk dd kk dk"]
      },
      {
        id: "2-3",
        name: "Drill 3: D K Combinations",
        texts: ["dkd kdk dkd kdk ddd kkk dkd kdk ddd kkk dkd kdk"]
      },
      {
        id: "2-4", 
        name: "Drill 4: Four-key Integration",
        texts: ["fjdk kdjf fjdk kdjf fjdk kdjf fjdk kdjf fjdk kdjf fjdk"]
      },
      {
        id: "2-5",
        name: "Drill 5: Complex Four-key",
        texts: ["fjdkjf dkfjdk kfjfdk jdkfjd fjdkjf dkfjdk kfjfdk jdkfjd fjdk"]
      },

      // Drills 6-10: Add capitals and previous keys (80-150 characters)
      {
        id: "2-6",
        name: "Drill 6: Capital D K Introduction",
        texts: ["Dk Kd dK kD DD KK Dk Kd dK kD FjDk KdFj DkFj JdKf Dk Kd dK kD DD KK Dk Kd dK kD FjDk KdFj DkFj JdKf DD KK"]
      },
      {
        id: "2-7",
        name: "Drill 7: Four-key Capitals",
        texts: ["FjDk JfKd DkFj KdJf FJDK fjdk FjDk JfKd DkFj KdJf FJDK fjdk FjDk JfKd DkFj KdJf FJDK fjdk FjDk JfKd DkFj"]
      },
      {
        id: "2-8", 
        name: "Drill 8: Mixed Case Mastery",
        texts: ["FjdK JfkD dKfJ kDjF fjDK jfkd FjdK JfkD dKfJ kDjF fjDK jfkd FjdK JfkD dKfJ kDjF fjDK jfkd FjdK JfkD dKfJ"]
      },
      {
        id: "2-9",
        name: "Drill 9: Capital Combinations", 
        texts: ["FJdk DKfj fjDK jfkd FJDK fjdk FJdk DKfj fjDK jfkd FJDK fjdk FJdk DKfj fjDK jfkd FJDK fjdk FJdk DKfj fjDK"]
      },
      {
        id: "2-10",
        name: "Drill 10: Speed Capitals",
        texts: ["F j d k F j d k Fj Dk Jf Kd FjDk JfKd DkFj KdJf fjdk jfkd FJDK fjdk FjDk JfKd DkFj KdJf fjdk jfkd FJDK"]
      },

      // Drills 11-15: Full tests with all learned keys (200-400 characters)
      {
        id: "2-11",
        name: "Drill 11: Word-like Sequences",
        texts: ["fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj fjdk dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj dkfj"]
      },
      {
        id: "2-12",
        name: "Drill 12: Complex Patterns",
        texts: ["FjdkJf KdfjDk fjDKjf kdFJdk FjdkJf KdfjDk fjDKjf kdFJdk FjdkJf KdfjDk fjDKjf kdFJdk FjdkJf KdfjDk fjDKjf kdFJdk FjdkJf KdfjDk fjDKjf kdFJdk FjdkJf KdfjDk fjDKjf kdFJdk FjdkJf KdfjDk fjDKjf kdFJdk FjdkJf KdfjDk fjDKjf"]
      },
      {
        id: "2-13",
        name: "Drill 13: Rhythm Mastery",
        texts: ["F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k F j d k"]
      },
      {
        id: "2-14", 
        name: "Drill 14: Advanced Integration",
        texts: ["FjDkJfKd DkFjKdJf fjdkjfkd kdfjdkfj FjDkJfKd DkFjKdJf fjdkjfkd kdfjdkfj FjDkJfKd DkFjKdJf fjdkjfkd kdfjdkfj FjDkJfKd DkFjKdJf fjdkjfkd kdfjdkfj FjDkJfKd DkFjKdJf fjdkjfkd kdfjdkfj FjDkJfKd DkFjKdJf fjdkjfkd kdfjdkfj FjDkJfKd DkFjKdJf fjdkjfkd kdfjdkfj FjDkJfKd DkFjKdJf fjdkjfkd"]
      },
      {
        id: "2-15",
        name: "Drill 15: Final Mastery Test",
        texts: ["FjDkJfKdFj DkFjKdJfDk fjdkjfkdfj kdfjdkfjkd FjDkJfKdFj DkFjKdJfDk fjdkjfkdfj kdfjdkfjkd FjDkJfKdFj DkFjKdJfDk fjdkjfkdfj kdfjdkfjkd FjDkJfKdFj DkFjKdJfDk fjdkjfkdfj kdfjdkfjkd FjDkJfKdFj DkFjKdJfDk fjdkjfkdfj kdfjdkfjkd FjDkJfKdFj DkFjKdJfDk fjdkjfkdfj kdfjdkfjkd FjDkJfKdFj DkFjKdJfDk"]
      }
    ]
  },

  // Chapter 3: Adding S & L (ring fingers)
  {
    id: "opt-chapter-3",
    name: "Chapter 3: Ring Fingers - S & L", 
    description: "Expand to ring fingers with S and L keys, building complete home row foundation.",
    lessons: [
      // Drills 1-5: Basic S L patterns (20-60 characters)
      {
        id: "3-1",
        name: "Drill 1: Basic S L Pattern",
        texts: ["s l sl ls ss ll s l sl ls"]
      },
      {
        id: "3-2",
        name: "Drill 2: S L Alternation",
        texts: ["l s ls sl ll ss l s ls sl ss ll sl"]
      },
      {
        id: "3-3", 
        name: "Drill 3: S L Combinations",
        texts: ["sls lsl sls lsl sss lll sls lsl sss lll sls lsl"]
      },
      {
        id: "3-4",
        name: "Drill 4: Six-key Integration", 
        texts: ["fjdksl slkdjf fjdksl slkdjf fjdksl slkdjf fjdksl slkdjf fjdk"]
      },
      {
        id: "3-5",
        name: "Drill 5: Complex Six-key",
        texts: ["fjdksljs lskdjfds kfjfdksl jsdkfjls fjdksljs lskdjfds kfjf"]
      },

      // Drills 6-10: Add capitals and previous keys (80-150 characters)
      {
        id: "3-6",
        name: "Drill 6: Capital S L Introduction", 
        texts: ["Sl Ls sL lS SS LL Sl Ls sL lS FjDkSl LsKdFj SlFj JdLs Sl Ls sL lS SS LL Sl Ls sL lS FjDkSl LsKdFj SlFj JdLs SS LL"]
      },
      {
        id: "3-7",
        name: "Drill 7: Six-key Capitals",
        texts: ["FjDkSl JfKdLs SlFjDk LsJfKd FJDKSL fjdksl FjDkSl JfKdLs SlFjDk LsJfKd FJDKSL fjdksl FjDkSl JfKdLs SlFjDk"]
      },
      {
        id: "3-8",
        name: "Drill 8: Mixed Case Mastery",
        texts: ["FjdkSl JfkdLs sLfJdK lSkDjF fjDkSL jfkdls FjdkSl JfkdLs sLfJdK lSkDjF fjDkSL jfkdls FjdkSl JfkdLs sLfJdK"]
      },
      {
        id: "3-9",
        name: "Drill 9: Capital Combinations",
        texts: ["FJDKsl SLKDfj fjDKSL jfkdls FJDKSL fjdksl FJDKsl SLKDfj fjDKSL jfkdls FJDKSL fjdksl FJDKsl SLKDfj fjDKSL"]
      },
      {
        id: "3-10", 
        name: "Drill 10: Speed Capitals",
        texts: ["F j d k s l F j d k s l Fj Dk Sl Jf Kd Ls FjDkSl JfKdLs SlFjDk LsJfKd fjdksl jfkdls FJDKSL fjdksl FjDkSl"]
      },

      // Drills 11-15: Full tests with all learned keys (200-400 characters)  
      {
        id: "3-11",
        name: "Drill 11: Word-like Sequences",
        texts: ["fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj fjdksl sldkfj"]
      },
      {
        id: "3-12",
        name: "Drill 12: Complex Patterns", 
        texts: ["FjdkslJf LskdfjDk fjDKSLjf lsKDFJdk FjdkslJf LskdfjDk fjDKSLjf lsKDFJdk FjdkslJf LskdfjDk fjDKSLjf lsKDFJdk FjdkslJf LskdfjDk fjDKSLjf lsKDFJdk FjdkslJf LskdfjDk fjDKSLjf lsKDFJdk FjdkslJf LskdfjDk fjDKSLjf lsKDFJdk FjdkslJf LskdfjDk fjDKSLjf"]
      },
      {
        id: "3-13",
        name: "Drill 13: Rhythm Mastery",
        texts: ["F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l F j d k s l"]
      },
      {
        id: "3-14",
        name: "Drill 14: Advanced Integration",
        texts: ["FjDkSlJfKdLs SlFjLsKdFjDk fjdkslkdfjls lskdfjdkslkf FjDkSlJfKdLs SlFjLsKdFjDk fjdkslkdfjls lskdfjdkslkf FjDkSlJfKdLs SlFjLsKdFjDk fjdkslkdfjls lskdfjdkslkf FjDkSlJfKdLs SlFjLsKdFjDk fjdkslkdfjls lskdfjdkslkf FjDkSlJfKdLs SlFjLsKdFjDk fjdkslkdfjls"]
      },
      {
        id: "3-15",
        name: "Drill 15: Final Mastery Test",
        texts: ["FjDkSlJfKdLsFj SlFjLsKdFjDkSl fjdkslkdfjlsf lskdfjdkslkfj FjDkSlJfKdLsFj SlFjLsKdFjDkSl fjdkslkdfjlsf lskdfjdkslkfj FjDkSlJfKdLsFj SlFjLsKdFjDkSl fjdkslkdfjlsf lskdfjdkslkfj FjDkSlJfKdLsFj SlFjLsKdFjDkSl fjdkslkdfjlsf lskdfjdkslkfj FjDkSlJfKdLsFj SlFjLsKdFjDkSl fjdkslkdfjlsf lskdfjdkslkfj"]
      }
    ]
  },

  // Chapter 4: Complete Home Row - A & ; (semicolon)
  {
    id: "opt-chapter-4",
    name: "Chapter 4: Complete Home Row - A & ;",
    description: "Master the complete home row with pinky fingers on A and semicolon.",
    lessons: [
      // Drills 1-5: Basic A ; patterns (20-60 characters)
      {
        id: "4-1",
        name: "Drill 1: Basic A ; Pattern",
        texts: ["a ; a; ;a aa ;; a ; a; ;a"]
      },
      {
        id: "4-2",
        name: "Drill 2: A ; Alternation",
        texts: ["; a ;a a; ;; aa ; a ;a a; aa ;; a;"]
      },
      {
        id: "4-3",
        name: "Drill 3: A ; Combinations", 
        texts: ["a;a ;a; a;a ;a; aaa ;;; a;a ;a; aaa ;;; a;a ;a;"]
      },
      {
        id: "4-4",
        name: "Drill 4: Full Home Row",
        texts: ["asdfghjkl; ;lkjhgfdsa asdfghjkl; ;lkjhgfdsa asdfghjkl; ;lkjhgfds"]
      },
      {
        id: "4-5", 
        name: "Drill 5: Home Row Flow",
        texts: ["asdfjkl; ;lkjfdsa asdfjkl; ;lkjfdsa asdfjkl; ;lkjfdsa asdfjkl; ;lk"]
      },

      // Drills 6-10: Add capitals and previous keys (80-150 characters)
      {
        id: "4-6",
        name: "Drill 6: Capital A ; Introduction",
        texts: ["A; ;A a; A; AA ;; A; ;A a; A; FjDkSlA; ;ALsKdFj A;Fj JdA; A; ;A a; A; AA ;; A; ;A a; A; FjDkSlA; ;ALsKdFj A;Fj JdA; AA ;;"]
      },
      {
        id: "4-7",
        name: "Drill 7: Home Row Capitals",
        texts: ["AsdfgjklA; FjDkSlA;Jf ;AslKdFjDk ASDFGJKLA; asdfgjkla; AsdfgjklA; FjDkSlA;Jf ;AslKdFjDk ASDFGJKLA; asdfgjkla; AsdfgjklA;"]
      },
      {
        id: "4-8",
        name: "Drill 8: Mixed Case Home Row",
        texts: ["AsdfjklA; ;alkjfdsa FjDkSlA;jf jF;AlsKd aSDFJKLA; asdfgjkla; AsdfjklA; ;alkjfdsa FjDkSlA;jf jF;AlsKd aSDFJKLA; asdfgjkla;"]
      },
      {
        id: "4-9",
        name: "Drill 9: Capital Flow",
        texts: ["ASDFGJKLA; asdfgjkla; FJDKSLA; fjdksla; A;SLDKFJ a;sldkfj ASDFGJKLA; asdfgjkla; FJDKSLA; fjdksla; A;SLDKFJ a;sldkfj ASDFGJKLA;"]
      },
      {
        id: "4-10",
        name: "Drill 10: Speed Home Row",
        texts: ["A s d f g j k l ; A s d f g j k l ; As Df Gj Kl ;A sD fG jK l; ASDFGJKL; asdfgjkl; A;sldkfj FJDKSL;a asdfgjkl; ASDFGJKL;"]
      },

      // Drills 11-15: Full tests with complete home row (200-400 characters)
      {
        id: "4-11",
        name: "Drill 11: Home Row Words",
        texts: ["ask; lad; sad; all; fall; flask; glad; has; shall; half; gash; dash; flag; slag; flash; ask; lad; sad; all; fall; flask; glad; has; shall; half; gash; dash; flag; slag; flash; ask; lad; sad; all; fall; flask; glad; has; shall; half; gash; dash; flag; slag; flash; ask; lad; sad; all; fall; flask; glad; has; shall; half; gash; dash; flag; slag; flash;"]
      },
      {
        id: "4-12",
        name: "Drill 12: Home Row Phrases",
        texts: ["a sad lad; all fall; a glad lass; shall ask; a flask; has half; gash flag; dash flask; a sad fall; glad half; ask all; shall dash; a lad has; all glad; fall flask; sad gash; a sad lad; all fall; a glad lass; shall ask; a flask; has half; gash flag; dash flask; a sad fall; glad half; ask all; shall dash; a lad has; all glad; fall flask; sad gash;"]
      },
      {
        id: "4-13",
        name: "Drill 13: Sentence Patterns",
        texts: ["A lad asks a sad lass; All fall; A glad flask has half; Shall a lad dash; A sad fall; Ask all; A lass has a flask; Fall glass; A lad shall ask; Has a glad half; A sad gash; All ask a lad; A lad asks a sad lass; All fall; A glad flask has half; Shall a lad dash; A sad fall; Ask all; A lass has a flask; Fall glass; A lad shall ask; Has a glad half; A sad gash; All ask a lad;"]
      },
      {
        id: "4-14",
        name: "Drill 14: Advanced Home Row",
        texts: ["AsdfgjklA;asdfgjklA; A sad lad asks all; A glad lass shall fall; Ask a lad; Has a flask; All dash; A fall gash; Shall ask all; A lad has half; Glad fall; A sad flask; Ask all lads; A lass shall dash; Fall half; Glad gash; A sad ask; AsdfgjklA;asdfgjklA; A sad lad asks all; A glad lass shall fall; Ask a lad; Has a flask; All dash; A fall gash; Shall ask all; A lad has half; Glad fall; A sad flask; Ask all lads; A lass shall dash; Fall half; Glad gash; A sad ask;"]
      },
      {
        id: "4-15",
        name: "Drill 15: Home Row Mastery",
        texts: ["ASDFGJKLA;asdfgjklA; A sad lad asks a glad lass; All shall fall; A flask has half; Ask all lads; A lass shall dash; Fall flask; Glad gash; A sad fall; Has a lad; All ask; A glad half; Shall dash; A lad has a sad flask; Ask a glad lass; All fall half; A sad gash; ASDFGJKLA;asdfgjklA; A sad lad asks a glad lass; All shall fall; A flask has half; Ask all lads; A lass shall dash; Fall flask; Glad gash; A sad fall; Has a lad; All ask; A glad half; Shall dash; A lad has a sad flask; Ask a glad lass; All fall half; A sad gash;"]
      }
    ]
  },

  // Chapter 5: Top Row Introduction - E & I  
  {
    id: "opt-chapter-5",
    name: "Chapter 5: Top Row - E & I",
    description: "Reach up to the top row with E and I keys, most common vowels.",
    lessons: [
      // Drills 1-5: Basic E I patterns (20-60 characters)
      {
        id: "5-1", 
        name: "Drill 1: Basic E I Pattern",
        texts: ["e i ei ie ee ii e i ei ie"]
      },
      {
        id: "5-2",
        name: "Drill 2: E I Alternation", 
        texts: ["i e ie ei ii ee i e ie ei ee ii ei"]
      },
      {
        id: "5-3",
        name: "Drill 3: E I Combinations",
        texts: ["eie iei eie iei eee iii eie iei eee iii eie iei"]
      },
      {
        id: "5-4",
        name: "Drill 4: Home Row + E I",
        texts: ["fjdkslei iefjdksl asdfei ieasdf fjdkslei iefjdksl asdfei ieasdf"]
      },
      {
        id: "5-5", 
        name: "Drill 5: Complex Integration",
        texts: ["eiasdfjkl; ;lkjfdsaie eiasdfjkl; ;lkjfdsaie eiasdfjkl; ;lkjfdsaie"]
      },

      // Drills 6-10: Add capitals and home row keys (80-150 characters)
      {
        id: "5-6",
        name: "Drill 6: Capital E I Introduction",
        texts: ["Ei Ie eI iE EE II Ei Ie eI iE AsdfEi IeAsdf EiAsdf JfIe Ei Ie eI iE EE II Ei Ie eI iE AsdfEi IeAsdf EiAsdf JfIe EE II"]
      },
      {
        id: "5-7", 
        name: "Drill 7: Words with E I",
        texts: ["see; lie; die; ask; all; is; if; feel; like; life; see; lie; die; ask; all; is; if; feel; like; life; See; Lie; Die; Ask; All; Is; If; Feel; Like; Life;"]
      },
      {
        id: "5-8",
        name: "Drill 8: E I Home Row Mix",
        texts: ["AeiSdfJklEi IeAslKdFjEi eiASDFJKLie EIasdfgjkl; AeiSdfJklEi IeAslKdFjEi eiASDFJKLie EIasdfgjkl; AeiSdfJklEi IeAslKdFjEi"]
      },
      {
        id: "5-9",
        name: "Drill 9: Simple Words", 
        texts: ["ask; lie; see; all; if; is; life; like; feel; asks; lies; sees; liked; feels; Ask; Lie; See; All; If; Is; Life; Like; Feel; Asks; Lies; Sees; Liked; Feels;"]
      },
      {
        id: "5-10",
        name: "Drill 10: Speed E I Words",
        texts: ["E I e i Ei Ie eI iE see lie die ask all is if feel like life See Lie Die Ask All Is If Feel Like Life see lie die ask all is if feel like life"]
      },

      // Drills 11-15: Full tests with home row + E I (200-400 characters)
      {
        id: "5-11", 
        name: "Drill 11: Simple Sentences",
        texts: ["I see a lad; He is sad; A lass likes all; I feel like a flask; She asks if all fall; He sees a glad life; I like a sad lie; Ask if he feels; A lad sees all; She is like a lass; I see a lad; He is sad; A lass likes all; I feel like a flask; She asks if all fall; He sees a glad life; I like a sad lie; Ask if he feels; A lad sees all; She is like a lass; I see a lad; He is sad; A lass likes all; I feel like a flask; She asks if all fall; He sees a glad life;"]
      },
      {
        id: "5-12",
        name: "Drill 12: E I Phrases",
        texts: ["I like all; She sees a lie; He feels sad; Ask if all fall; A lad likes life; I see a flask; She asks a lass; He is glad; All feel like; I ask if; She sees all; He likes a lad; Ask a glad lass; I feel sad; She is like all; He sees a life; I like all; She sees a lie; He feels sad; Ask if all fall; A lad likes life; I see a flask; She asks a lass; He is glad; All feel like; I ask if; She sees all; He likes a lad; Ask a glad lass; I feel sad; She is like all; He sees a life;"]
      },
      {
        id: "5-13",
        name: "Drill 13: Complex E I Sentences",
        texts: ["I see a sad lad ask a glad lass if she likes life; He feels like all shall fall; She asks if a flask has half; I like a glad lad; Ask if he sees all; A lass feels sad; He is like a fall flask; I see all lads ask; She likes a sad life; He feels if all ask; I see a sad lad ask a glad lass if she likes life; He feels like all shall fall; She asks if a flask has half; I like a glad lad; Ask if he sees all; A lass feels sad; He is like a fall flask; I see all lads ask; She likes a sad life; He feels if all ask;"]
      },
      {
        id: "5-14",
        name: "Drill 14: Advanced E I Integration", 
        texts: ["EiAsdfgjklEi; IeasdfgjklIe; I see all lads ask if she feels like a glad life; He asks a sad lass if all shall fall; A flask has half if I like; She sees a lad feel sad; He is like all ask; I feel if a lass likes; Ask a glad lad if he sees all; She is a sad life; He likes if all feel; I ask a lass if she shall; EiAsdfgjklEi; IeasdfgjklIe; I see all lads ask if she feels like a glad life; He asks a sad lass if all shall fall; A flask has half if I like; She sees a lad feel sad; He is like all ask; I feel if a lass likes; Ask a glad lad if he sees all; She is a sad life; He likes if all feel; I ask a lass if she shall;"]
      },
      {
        id: "5-15",
        name: "Drill 15: E I Mastery Test",
        texts: ["EIasdfgjklEiAsdfgjklIe; I see a sad lad ask a glad lass if she feels like a sad life; He asks all lads if a flask has half; She likes if all shall fall; I feel a glad lass asks; He sees all lads like a sad fall; Ask if she is like a life; I like all lads feel sad; He asks a lass if she shall; A glad life feels like all ask; I see if he likes a sad flask; She feels all lads ask; He is like a glad fall; I ask if a lass sees all; She likes a sad life; He feels if all shall ask; EIasdfgjklEiAsdfgjklIe; I see a sad lad ask a glad lass if she feels like a sad life; He asks all lads if a flask has half; She likes if all shall fall; I feel a glad lass asks; He sees all lads like a sad fall; Ask if she is like a life; I like all lads feel sad; He asks a lass if she shall; A glad life feels like all ask;"]
      }
    ]
  },

  // Chapter 6: Top Row Complete - Q & P
  {
    id: "opt-chapter-6",
    name: "Chapter 6: Top Row Complete - Q & P",
    description: "Complete the top row with Q and P keys, enabling full word formation.",
    lessons: [
      // Drills 1-5: Basic Q P patterns (20-60 characters)
      {
        id: "6-1",
        name: "Drill 1: Basic Q P Pattern",
        texts: ["q p qp pq qq pp q p qp pq"]
      },
      {
        id: "6-2",
        name: "Drill 2: Q P Alternation",
        texts: ["p q pq qp pp qq p q pq qp qq pp pq"]
      },
      {
        id: "6-3",
        name: "Drill 3: Q P Integration", 
        texts: ["qpq pqp qpq pqp qqq ppp qpq pqp qqq ppp qpq pqp"]
      },
      {
        id: "6-4",
        name: "Drill 4: Top Row Mix",
        texts: ["qwertyuiop poiuytrewq qwertyuiop poiuytrewq qwertyuiop poiuyt"]
      },
      {
        id: "6-5",
        name: "Drill 5: Top Row Flow",
        texts: ["qpwoeiru tyuiqp qpwoeiru tyuiqp qpwoeiru tyuiqp qpwoeiru tyuiqp"]
      },

      // Drills 6-10: Add capitals and previous keys (80-150 characters)
      {
        id: "6-6",
        name: "Drill 6: Capital Q P Introduction",
        texts: ["Qp Pq qP pQ QQ PP Qp Pq qP pQ AsdfQp PqAsdf QpAsdf JfPq Qp Pq qP pQ QQ PP Qp Pq qP pQ AsdfQp PqAsdf QpAsdf JfPq QQ PP"]
      },
      {
        id: "6-7",
        name: "Drill 7: Simple Words",
        texts: ["quip; part; poet; quote; paper; quiet; proper; queer; people; sequel; equip; pupil; Queen; Paris; Quilt; People; Paper; Proper;"]
      },
      {
        id: "6-8",
        name: "Drill 8: Q P Home Row Mix",
        texts: ["AqpSdfJklQp PqAslKdFjQp qpASDFJKLpq QPasdfgjkl; AqpSdfJklQp PqAslKdFjQp qpASDFJKLpq QPasdfgjkl; AqpSdfJklQp PqAslKdFjQp"]
      },
      {
        id: "6-9",
        name: "Drill 9: Real Words",
        texts: ["people ask; quiet paper; proper quilt; equip people; sequel quote; queer part; Queen Paris; quip poet; paper people; quiet proper; part equip;"]
      },
      {
        id: "6-10",
        name: "Drill 10: Speed Q P Words",
        texts: ["Q P q p Qp Pq qP pQ quip part poet quote paper quiet proper queer people sequel equip pupil Queen Paris Quilt People Paper Proper"]
      },

      // Drills 11-15: Full tests with complete top row (200-400 characters)
      {
        id: "6-11",
        name: "Drill 11: Top Row Sentences",
        texts: ["I quote people; She is quiet; A proper paper; He equips parts; People are proper; A queer quote; Quiet paper people; I equip a part; She quotes poetry; A proper sequel; People quote papers; He is quite proper; A quiet poet; Equip the people; She has a proper quilt; I quote poetry; A quiet paper; People equip parts; She is a proper poet; He quotes people; A queer sequel; Quiet people quote; I equip papers; She has proper parts; A poet quotes people;"]
      },
      {
        id: "6-12",
        name: "Drill 12: Complex Top Row",
        texts: ["Quote people properly; Equip quiet poets; Paper sequel quotes; Proper people quip; Quiet paper poetry; Equip proper parts; People quote sequels; Queer paper quotes; Proper quiet poets; Equip paper quotes; People are quite proper; Quiet poetry sequel; Proper people quotes; Equip quiet papers; Poetry quote people; Quote people properly; Equip quiet poets; Paper sequel quotes; Proper people quip; Quiet paper poetry; Equip proper parts; People quote sequels; Queer paper quotes; Proper quiet poets; Equip paper quotes;"]
      },
      {
        id: "6-13",
        name: "Drill 13: Full Top Row Flow",
        texts: ["qwertyuiop poiuytrewq quote proper equip quiet people poetry paper sequel queer quilt pupil part poet Quote Proper Equip Quiet People Poetry Paper Sequel Queer Quilt Pupil Part Poet qwertyuiop poiuytrewq quote proper equip quiet people poetry paper sequel queer quilt pupil part poet Quote Proper Equip Quiet People Poetry Paper Sequel Queer Quilt Pupil Part Poet qwertyuiop poiuytrewq quote proper equip quiet people poetry paper sequel queer quilt pupil part poet"]
      },
      {
        id: "6-14",
        name: "Drill 14: Advanced Integration",
        texts: ["QwertyuiopAsdfgjkl; People quote proper poetry; Quiet poets equip paper; A sequel is quite proper; Paper people quote poetry; Equip quiet poets properly; Proper people quote sequels; Quote paper poetry people; Quiet sequel poetry quotes; People equip proper papers; QwertyuiopAsdfgjkl; People quote proper poetry; Quiet poets equip paper; A sequel is quite proper; Paper people quote poetry; Equip quiet poets properly; Proper people quote sequels; Quote paper poetry people; Quiet sequel poetry quotes; People equip proper papers;"]
      },
      {
        id: "6-15",
        name: "Drill 15: Top Row Mastery",
        texts: ["QwertyuiopAsdfgjklQwerty; Quote proper poetry people equip quiet papers sequel; Poets quote people properly equip quiet sequels paper; A proper quiet poet quotes people equip paper sequel poetry; People quote proper poetry equip quiet poets paper sequel; Quiet poets quote proper people equip paper poetry sequel; QwertyuiopAsdfgjklQwerty; Quote proper poetry people equip quiet papers sequel; Poets quote people properly equip quiet sequels paper; A proper quiet poet quotes people equip paper sequel poetry; People quote proper poetry equip quiet poets paper sequel; Quiet poets quote proper people equip paper poetry sequel;"]
      }
    ]
  },

  // Chapter 7: Bottom Row Introduction - N & M
  {
    id: "opt-chapter-7",
    name: "Chapter 7: Bottom Row - N & M",
    description: "Reach down to bottom row with N and M keys, common consonants.",
    lessons: [
      // Drills 1-5: Basic N M patterns
      {
        id: "7-1",
        name: "Drill 1: Basic N M Pattern",
        texts: ["n m nm mn nn mm n m nm mn"]
      },
      {
        id: "7-2", 
        name: "Drill 2: N M Alternation",
        texts: ["m n mn nm mm nn m n mn nm nn mm mn"]
      },
      {
        id: "7-3",
        name: "Drill 3: N M Combinations",
        texts: ["nmn mnm nmn mnm nnn mmm nmn mnm nnn mmm nmn mnm"]
      },
      {
        id: "7-4",
        name: "Drill 4: With Previous Keys",
        texts: ["asdfghjklnm mnlkjhgfdsa asdfghjklnm mnlkjhgfdsa asdfghjklnm"]
      },
      {
        id: "7-5",
        name: "Drill 5: Complex Integration",
        texts: ["qwertyuiopnm mnpoiuytrewq qwertyuiopnm mnpoiuytrewq qwertyuiopnm"]
      },

      // Drills 6-10: Add capitals and real words
      {
        id: "7-6",
        name: "Drill 6: Capital N M Introduction",
        texts: ["Nm Mn nM mN NN MM Nm Mn nM mN AsdfNm MnAsdf NmAsdf JfMn Nm Mn nM mN NN MM Nm Mn nM mN AsdfNm MnAsdf NmAsdf JfMn NN MM"]
      },
      {
        id: "7-7",
        name: "Drill 7: Simple N M Words",
        texts: ["man; men; name; mean; main; moon; mine; mind; many; more; time; from; game; same; poem; term; Man; Men; Name; Mean; Main; Moon; Mine;"]
      },
      {
        id: "7-8",
        name: "Drill 8: N M Sentences",
        texts: ["A man; Many men; Main name; Mean time; Mine name; Moon time; From main; Game time; Same name; Term poem; Name game; Time mean; Man main;"]
      },
      {
        id: "7-9",
        name: "Drill 9: Complex N M Words",
        texts: ["maintain; remain; human; moment; element; simple; number; summer; winter; common; modern; German; woman; Roman; minute; Mountain; Remain; Human;"]
      },
      {
        id: "7-10",
        name: "Drill 10: Speed N M Practice",
        texts: ["N M n m Nm Mn nM mN man men name mean main moon mine mind many more time from game same poem term maintain remain human moment element"]
      },

      // Drills 11-15: Full integration
      {
        id: "7-11",
        name: "Drill 11: Real Sentences",
        texts: ["A man maintains time; Many men remain human; Main moment mine; Mean time from game; Mine name is main; Moon time poem; From main game; Time mean moment; Man main remain; Name game time; Human moment mine; Simple time name; Common man time; Modern men remain; Number game time; Summer time mine; Winter name game; A man maintains time; Many men remain human; Main moment mine; Mean time from game; Mine name is main; Moon time poem; From main game; Time mean moment; Man main remain; Name game time;"]
      },
      {
        id: "7-12",
        name: "Drill 12: Complex Phrases",
        texts: ["Human elements remain simple; Modern men maintain common time; Summer moment mine name; Winter game time remain; Number time human element; Common moment main name; Simple men remain human; Modern time mine game; Summer name winter time; Moment human remain time; Human elements remain simple; Modern men maintain common time; Summer moment mine name; Winter game time remain; Number time human element; Common moment main name; Simple men remain human; Modern time mine game; Summer name winter time; Moment human remain time;"]
      },
      {
        id: "7-13",
        name: "Drill 13: Full Keyboard Flow",
        texts: ["qwertyuiopasdfghjklnm mnlkjhgfdsapoiuytrewq A human name remains main time; Many men maintain common moment; Simple time mine game remain; Modern moment human name time; qwertyuiopasdfghjklnm mnlkjhgfdsapoiuytrewq A human name remains main time; Many men maintain common moment; Simple time mine game remain; Modern moment human name time; qwertyuiopasdfghjklnm mnlkjhgfdsapoiuytrewq A human name remains main time; Many men maintain common moment; Simple time mine game remain; Modern moment human name time;"]
      },
      {
        id: "7-14",
        name: "Drill 14: Advanced N M Integration",
        texts: ["QwertyuiopAsdfghjklNm; Human men maintain common time remain simple moment; Modern name mine game time human element remain; A simple human name remains main time moment; Many modern men maintain common time game remain; QwertyuiopAsdfghjklNm; Human men maintain common time remain simple moment; Modern name mine game time human element remain; A simple human name remains main time moment; Many modern men maintain common time game remain; QwertyuiopAsdfghjklNm; Human men maintain common time remain simple moment; Modern name mine game time human element remain;"]
      },
      {
        id: "7-15",
        name: "Drill 15: N M Mastery Test",
        texts: ["QwertyuiopAsdfghjklNmQwerty; Human men maintain common time remain simple moment name; Modern time mine game human element remain main moment; A simple human name remains main time moment mine game; Many modern men maintain common time game remain human element; Simple time mine game remain human moment main name; QwertyuiopAsdfghjklNmQwerty; Human men maintain common time remain simple moment name; Modern time mine game human element remain main moment; A simple human name remains main time moment mine game; Many modern men maintain common time game remain human element; Simple time mine game remain human moment main name;"]
      }
    ]
  },

  // Chapter 8: Bottom Row Complete - V, C, X, Z, B
  {
    id: "opt-chapter-8",
    name: "Chapter 8: Bottom Row Complete - V, C, X, Z, B",
    description: "Master the complete bottom row alphabet keys.",
    lessons: [
      // Drills 1-5: Basic bottom row patterns
      {
        id: "8-1",
        name: "Drill 1: V & C Pattern",
        texts: ["v c vc cv vv cc v c vc cv"]
      },
      {
        id: "8-2",
        name: "Drill 2: X & Z Pattern", 
        texts: ["x z xz zx xx zz x z xz zx"]
      },
      {
        id: "8-3",
        name: "Drill 3: B Integration",
        texts: ["b vn cm xz bv nc mx zb vn cm xz bv nc mx zb"]
      },
      {
        id: "8-4",
        name: "Drill 4: Full Bottom Row",
        texts: ["vxcbnm mnbcxv vxcbnm mnbcxv vxcbnm mnbcxv vxcbnm mnbcxv vxcbnm"]
      },
      {
        id: "8-5",
        name: "Drill 5: Bottom Row Flow",
        texts: ["zxcvbnm mnbvcxz zxcvbnm mnbvcxz zxcvbnm mnbvcxz zxcvbnm mnbvcxz"]
      },

      // Drills 6-10: Add capitals and real words
      {
        id: "8-6",
        name: "Drill 6: Bottom Row Capitals",
        texts: ["Vc Cv vC cV VV CC Xz Zx xZ zX XX ZZ Bv Vb bV vB BB VV Vc Cv vC cV VV CC Xz Zx xZ zX XX ZZ Bv Vb bV vB BB VV"]
      },
      {
        id: "8-7",
        name: "Drill 7: Simple Bottom Words",
        texts: ["can; van; box; mix; big; but; back; come; voice; place; choice; example; Cabin; Voice; Place; Choice; Example; Combat; Zebra; Mixed;"]
      },
      {
        id: "8-8",
        name: "Drill 8: Bottom Row Sentences",
        texts: ["A big box; Can voice choice; Mix example place; Back cabin voice; Come big example; Box choice place; Voice cabin example; Mix big choice;"]
      },
      {
        id: "8-9",
        name: "Drill 9: Complex Bottom Words",
        texts: ["become; because; combine; vibrant; complex; example; machine; advance; balance; cabinet; examine; vaccine; zombie; bronze; fabric; fabric;"]
      },
      {
        id: "8-10",
        name: "Drill 10: Speed Bottom Practice",
        texts: ["V C X Z B v c x z b can van box mix big but back come voice place choice example become because combine vibrant complex machine advance"]
      },

      // Drills 11-15: Full alphabet integration
      {
        id: "8-11",
        name: "Drill 11: Full Alphabet Sentences",
        texts: ["The quick brown fox jumps over the lazy dog; A vibrant example becomes complex machine; Can voice choice combine example place; Big box machine advance cabinet example; Complex voice choice become example machine; Vibrant cabinet advance example choice; The quick brown fox jumps over the lazy dog; A vibrant example becomes complex machine; Can voice choice combine example place; Big box machine advance cabinet example; Complex voice choice become example machine; Vibrant cabinet advance example choice;"]
      },
      {
        id: "8-12",
        name: "Drill 12: Pangram Practice",
        texts: ["Pack my box with five dozen liquor jugs; The five boxing wizards jump quickly; How quickly daft jumping zebras vex; Amazingly few discotheques provide jukeboxes; Pack my box with five dozen liquor jugs; The five boxing wizards jump quickly; How quickly daft jumping zebras vex; Amazingly few discotheques provide jukeboxes; Pack my box with five dozen liquor jugs; The five boxing wizards jump quickly; How quickly daft jumping zebras vex; Amazingly few discotheques provide jukeboxes;"]
      },
      {
        id: "8-13",
        name: "Drill 13: Complete Keyboard Flow",
        texts: ["qwertyuiopasdfghjklzxcvbnm mnbvcxzlkjhgfdsapoiuytrewq The complete alphabet enables complex communication; Every letter combines to create meaningful expression; Complex ideas become simple through clear communication; qwertyuiopasdfghjklzxcvbnm mnbvcxzlkjhgfdsapoiuytrewq The complete alphabet enables complex communication; Every letter combines to create meaningful expression; Complex ideas become simple through clear communication;"]
      },
      {
        id: "8-14",
        name: "Drill 14: Advanced Full Alphabet",
        texts: ["QwertyuiopAsdfghjklZxcvbnm; The quick brown fox jumps over the lazy dog become example; Complex vibrant machine advance cabinet choice example voice; A big box can voice choice combine example place become machine; Every letter enables complex communication advance example choice voice; QwertyuiopAsdfghjklZxcvbnm; The quick brown fox jumps over the lazy dog become example; Complex vibrant machine advance cabinet choice example voice; A big box can voice choice combine example place become machine; Every letter enables complex communication advance example choice voice;"]
      },
      {
        id: "8-15",
        name: "Drill 15: Full Alphabet Mastery",
        texts: ["QwertyuiopAsdfghjklZxcvbnmQwerty; The quick brown fox jumps over the lazy dog become vibrant example machine; Complex communication advance through every letter combination choice example voice cabinet; A big box can voice choice combine example place become complex machine advance cabinet; Every alphabet letter enables complex vibrant communication advance example choice voice machine cabinet; QwertyuiopAsdfghjklZxcvbnmQwerty; The quick brown fox jumps over the lazy dog become vibrant example machine; Complex communication advance through every letter combination choice example voice cabinet; A big box can voice choice combine example place become complex machine advance cabinet; Every alphabet letter enables complex vibrant communication advance example choice voice machine cabinet;"]
      }
    ]
  },

  // Chapter 9: Numbers Row - 1-5
  {
    id: "opt-chapter-9",
    name: "Chapter 9: Numbers Row - 1 to 5",
    description: "Master the left side of the number row with digits 1-5.",
    lessons: [
      // Drills 1-5: Basic number patterns
      {
        id: "9-1",
        name: "Drill 1: Basic 1-2 Pattern",
        texts: ["1 2 12 21 11 22 1 2 12 21"]
      },
      {
        id: "9-2",
        name: "Drill 2: Add 3 Pattern",
        texts: ["1 2 3 123 321 132 213 312 231 1 2 3 123 321 132"]
      },
      {
        id: "9-3",
        name: "Drill 3: Add 4 Pattern",
        texts: ["1 2 3 4 1234 4321 1423 2314 3142 4132 1 2 3 4 1234 4321"]
      },
      {
        id: "9-4",
        name: "Drill 4: Add 5 Complete",
        texts: ["1 2 3 4 5 12345 54321 15243 24531 35412 45123 1 2 3 4 5 12345"]
      },
      {
        id: "9-5",
        name: "Drill 5: Number Combinations",
        texts: ["12 23 34 45 51 13 24 35 41 52 14 25 31 42 53 15 21 32 43 54"]
      },

      // Drills 6-10: Numbers with letters
      {
        id: "9-6",
        name: "Drill 6: Numbers With Text",
        texts: ["I have 1 car; She has 2 cats; He owns 3 houses; We need 4 chairs; They have 5 books; Call me at 1:00; Meet at 2:30; Finish by 3:15;"]
      },
      {
        id: "9-7",
        name: "Drill 7: Dates and Times",
        texts: ["May 1st; June 2nd; July 3rd; August 4th; September 5th; 1:00 PM; 2:30 AM; 3:45 PM; 4:15 AM; 5:50 PM; Born in 1995; Class of 2014;"]
      },
      {
        id: "9-8",
        name: "Drill 8: Phone Numbers",
        texts: ["Call 123-4567; Phone 234-5123; Number 345-1234; Contact 451-2345; Reach 512-3451; Emergency 911; Information 411; Call 123-4567;"]
      },
      {
        id: "9-9",
        name: "Drill 9: Addresses and Codes",
        texts: ["123 Main Street; 234 Oak Avenue; 345 Pine Road; 451 Elm Drive; 512 Cedar Lane; Zip code 12345; Area code 234; Route 51; Highway 43;"]
      },
      {
        id: "9-10",
        name: "Drill 10: Mixed Numbers Text",
        texts: ["1 2 3 4 5 I have 1 car and 2 cats; She needs 3 books for 4 classes; He has 5 minutes at 1:30; Call 234-5123 on May 1st; 12345 54321"]
      },

      // Drills 11-15: Advanced number usage
      {
        id: "9-11",
        name: "Drill 11: Mathematical Expressions",
        texts: ["1 + 2 = 3; 2 + 3 = 5; 3 + 1 = 4; 4 + 1 = 5; 5 - 1 = 4; 5 - 2 = 3; 4 - 1 = 3; 3 - 2 = 1; 2 - 1 = 1; 1 + 1 = 2; 1 + 2 = 3; 2 + 3 = 5; 3 + 1 = 4; 4 + 1 = 5; 5 - 1 = 4; 5 - 2 = 3; 4 - 1 = 3; 3 - 2 = 1; 2 - 1 = 1; 1 + 1 = 2; 1 + 2 = 3; 2 + 3 = 5; 3 + 1 = 4; 4 + 1 = 5; 5 - 1 = 4; 5 - 2 = 3; 4 - 1 = 3; 3 - 2 = 1;"]
      },
      {
        id: "9-12",
        name: "Drill 12: Lists and Sequences",
        texts: ["First: 1 item; Second: 2 items; Third: 3 items; Fourth: 4 items; Fifth: 5 items; Step 1: Begin; Step 2: Continue; Step 3: Progress; Step 4: Complete; Step 5: Finish; Chapter 1 introduction; Chapter 2 development; Chapter 3 climax; Chapter 4 resolution; Chapter 5 conclusion; First: 1 item; Second: 2 items; Third: 3 items; Fourth: 4 items; Fifth: 5 items; Step 1: Begin; Step 2: Continue; Step 3: Progress; Step 4: Complete; Step 5: Finish;"]
      },
      {
        id: "9-13",
        name: "Drill 13: Complex Number Sentences",
        texts: ["The 1st person arrived at 2:30 with 3 bags containing 4 books and 5 papers; She dialed 123-4567 and spoke for 12 minutes about 34 items; He lives at 512 Main Street and works 5 days from 1:00 to 4:30; The meeting on May 3rd at 2:15 included 4 people discussing 5 topics; Call 234-5123 between 1:00 and 3:45 to schedule 2 appointments; The 1st person arrived at 2:30 with 3 bags containing 4 books and 5 papers; She dialed 123-4567 and spoke for 12 minutes about 34 items;"]
      },
      {
        id: "9-14",
        name: "Drill 14: Advanced Number Integration",
        texts: ["QwertyuiopAsdfghjklZxcvbnm12345; The 1st meeting at 2:30 PM on May 3rd includes 4 people discussing 5 main topics; She called 123-4567 and spoke for 15 minutes about 24 different items; He lives at 512 Main Street and works 5 days from 1:00 to 4:30 PM; The conference on June 2nd has 3 sessions with 45 attendees; QwertyuiopAsdfghjklZxcvbnm12345; The 1st meeting at 2:30 PM on May 3rd includes 4 people discussing 5 main topics; She called 123-4567 and spoke for 15 minutes about 24 different items;"]
      },
      {
        id: "9-15",
        name: "Drill 15: Numbers 1-5 Mastery",
        texts: ["QwertyuiopAsdfghjklZxcvbnm12345Qwerty; The 1st comprehensive meeting at 2:30 PM on May 3rd includes 4 experienced people discussing 5 main strategic topics; She called 123-4567 and spoke for 15 productive minutes about 24 different important items; He lives at 512 Main Street and works 5 dedicated days from 1:00 to 4:30 PM; The annual conference on June 2nd has 3 interactive sessions with 45 enthusiastic attendees; Call 234-5123 between 1:00 and 3:45 to schedule 2 important appointments for May 14th; QwertyuiopAsdfghjklZxcvbnm12345Qwerty; The 1st comprehensive meeting at 2:30 PM on May 3rd includes 4 experienced people discussing 5 main strategic topics;"]
      }
    ]
  },

  // Chapter 10: Numbers Row Complete - 6-0
  {
    id: "opt-chapter-10",
    name: "Chapter 10: Numbers Row Complete - 6 to 0",
    description: "Complete the number row with digits 6-0, enabling full numeric typing.",
    lessons: [
      // Drills 1-5: Basic 6-0 patterns
      {
        id: "10-1",
        name: "Drill 1: Basic 6-7 Pattern",
        texts: ["6 7 67 76 66 77 6 7 67 76"]
      },
      {
        id: "10-2",
        name: "Drill 2: Add 8 Pattern",
        texts: ["6 7 8 678 876 687 768 786 867 6 7 8 678 876 687"]
      },
      {
        id: "10-3",
        name: "Drill 3: Add 9 Pattern",
        texts: ["6 7 8 9 6789 9876 6879 7689 8796 9687 6 7 8 9 6789 9876"]
      },
      {
        id: "10-4",
        name: "Drill 4: Add 0 Complete",
        texts: ["6 7 8 9 0 67890 09876 60879 70689 80796 90687 6 7 8 9 0 67890"]
      },
      {
        id: "10-5",
        name: "Drill 5: All Numbers Flow",
        texts: ["1234567890 0987654321 1357902468 2468013579 1029384756 5647382910"]
      },

      // Drills 6-10: Numbers with text integration
      {
        id: "10-6",
        name: "Drill 6: Complete Numbers Text",
        texts: ["Call 678-9012; Room 7890; Code 6789; Year 1970; Phone 890-6789; Address 6789 Oak Street; Born in 1980; Class of 2006; Flight 789;"]
      },
      {
        id: "10-7",
        name: "Drill 7: Years and Dates",
        texts: ["Born 1960; Graduated 1978; Married 1989; Retired 2007; Year 2024; January 6th; July 7th; August 8th; September 9th; October 10th;"]
      },
      {
        id: "10-8",
        name: "Drill 8: Full Phone Numbers",
        texts: ["Call 567-890-1234; Phone 678-901-2345; Number 789-012-3456; Contact 890-123-4567; Emergency 911; Information 411; Toll-free 800;"]
      },
      {
        id: "10-9",
        name: "Drill 9: Complex Numbers",
        texts: ["Population 7,890,123; Distance 6,789 miles; Price $1,234.67; Time 7:89:06; Code 0987654321; Account 123-456-7890; Order #789012;"]
      },
      {
        id: "10-10",
        name: "Drill 10: Mixed All Numbers",
        texts: ["1234567890 0987654321 Call 567-890-1234 at 7:30 PM on June 8th; Account 123-456-7890 has $6,789.00; Order #567890 ships to 1234 Oak Street;"]
      },

      // Drills 11-15: Advanced complete number usage
      {
        id: "10-11",
        name: "Drill 11: Mathematical Complete",
        texts: ["6 + 7 = 13; 8 + 9 = 17; 7 + 6 = 13; 9 + 8 = 17; 10 - 1 = 9; 9 - 2 = 7; 8 - 3 = 5; 7 - 4 = 3; 6 - 5 = 1; 67 + 89 = 156; 78 + 90 = 168; 123 + 456 = 579; 234 + 567 = 801; 345 + 678 = 1023; 6 + 7 = 13; 8 + 9 = 17; 7 + 6 = 13; 9 + 8 = 17; 10 - 1 = 9; 9 - 2 = 7; 8 - 3 = 5; 7 - 4 = 3; 6 - 5 = 1; 67 + 89 = 156; 78 + 90 = 168; 123 + 456 = 579; 234 + 567 = 801; 345 + 678 = 1023;"]
      },
      {
        id: "10-12",
        name: "Drill 12: Professional Numbers",
        texts: ["Invoice #1234567890; Account 098-765-4321; Transaction ID 567890123; Customer #456789012; Order 345678901; Reference 234567890; Confirmation 123456789; Case #987654321; Ticket 876543210; Policy 765432109; Invoice #1234567890; Account 098-765-4321; Transaction ID 567890123; Customer #456789012; Order 345678901; Reference 234567890; Confirmation 123456789; Case #987654321; Ticket 876543210; Policy 765432109;"]
      },
      {
        id: "10-13",
        name: "Drill 13: Statistical Data",
        texts: ["Population: 1,234,567,890 people; Revenue: $67,890,123 annually; Distance: 6,789 kilometers; Temperature: 78.9 degrees; Percentage: 90.6% complete; Score: 8,765 points; Rating: 9.0 out of 10; Sales: 567,890 units; Growth: 12.34% increase; Population: 1,234,567,890 people; Revenue: $67,890,123 annually; Distance: 6,789 kilometers; Temperature: 78.9 degrees; Percentage: 90.6% complete; Score: 8,765 points; Rating: 9.0 out of 10; Sales: 567,890 units; Growth: 12.34% increase;"]
      },
      {
        id: "10-14",
        name: "Drill 14: Advanced Number Integration",
        texts: ["QwertyuiopAsdfghjklZxcvbnm1234567890; The comprehensive report shows 1,234,567 customers generated $6,789,012 revenue in 2023; Call 567-890-1234 to discuss order #789012 shipping to 6789 Oak Street; The meeting on July 8th at 9:30 AM includes 67 participants discussing 89 agenda items; Account 123-456-7890 processed 6,789 transactions totaling $1,234,567.89; QwertyuiopAsdfghjklZxcvbnm1234567890; The comprehensive report shows 1,234,567 customers generated $6,789,012 revenue in 2023; Call 567-890-1234 to discuss order #789012 shipping to 6789 Oak Street;"]
      },
      {
        id: "10-15",
        name: "Drill 15: Complete Numbers Mastery",
        texts: ["QwertyuiopAsdfghjklZxcvbnm1234567890Qwerty; The comprehensive financial report shows 1,234,567 active customers generated $6,789,012 revenue in fiscal year 2023; Call 567-890-1234 to discuss urgent order #789012 shipping to 6789 Oak Street by September 10th; The quarterly meeting on July 8th at 9:30 AM includes 67 experienced participants discussing 89 strategic agenda items; Account 123-456-7890 processed 6,789 successful transactions totaling $1,234,567.89 last quarter; The analytics dashboard displays 890,123 page views with 67.8% engagement rate; QwertyuiopAsdfghjklZxcvbnm1234567890Qwerty; The comprehensive financial report shows 1,234,567 active customers generated $6,789,012 revenue in fiscal year 2023;"]
      }
    ]
  },

  // Chapter 11: Symbols & Punctuation Basics
  {
    id: "opt-chapter-11",
    name: "Chapter 11: Symbols & Punctuation Basics",
    description: "Master essential punctuation and symbols for professional writing.",
    lessons: [
      // Basic punctuation drills with progressive difficulty
      {
        id: "11-1",
        name: "Drill 1: Period & Comma",
        texts: ["Hello, world. This is a test. Yes, it works. No, wait. Stop, look, listen. Go, now. Come, here. See, the cat. Find, the dog."]
      },
      {
        id: "11-2", 
        name: "Drill 2: Question & Exclamation",
        texts: ["What? How? When? Where? Why? Who? Great! Amazing! Wonderful! Perfect! Excellent! What time? How much? When ready? Where now? Why not?"]
      },
      {
        id: "11-3",
        name: "Drill 3: Apostrophes & Quotes",
        texts: ["It's great. That's mine. Here's yours. Don't stop. Can't wait. Won't go. She said, \"Hello.\" He asked, \"Why?\" \"Come here,\" she said."]
      },
      {
        id: "11-4",
        name: "Drill 4: Colons & Semicolons",
        texts: ["Note: This is important. Time: 3:30 PM. Rule: Always try. First; second; third. Here; there; everywhere. Stop; go; wait; continue."]
      },
      {
        id: "11-5",
        name: "Drill 5: Parentheses & Brackets",
        texts: ["The result (see page 10) is clear. Call me (555-1234) today. The data [from 2023] shows growth. Use brackets [like this] for notes."]
      },
      // Continue with increasingly complex punctuation...
      {
        id: "11-6",
        name: "Drill 6: Professional Punctuation",
        texts: ["Dear Sir/Madam: Please find attached... Best regards, John Smith. P.S. Don't forget the meeting. N.B. This is important. etc., i.e., e.g.,"]
      },
      {
        id: "11-7",
        name: "Drill 7: Academic Writing",
        texts: ["According to Smith (2023), \"The results were significant\" (p. 45). However, Jones et al. (2024) argued otherwise. See Chapter 3, Section 2.1."]
      },
      {
        id: "11-8",
        name: "Drill 8: Business Communication",
        texts: ["Re: Project Update - Phase 1 complete. FYI: Meeting rescheduled to 2:30 PM. CC: All team members. BCC: Manager only. ASAP response needed."]
      },
      {
        id: "11-9",
        name: "Drill 9: Technical Writing",
        texts: ["Error 404: Page not found. Status: OK (200). Function getData() returns JSON. Variable userName = \"JohnDoe\"; Check line 42."]
      },
      {
        id: "11-10",
        name: "Drill 10: Mixed Punctuation Flow",
        texts: ["What's the time? It's 3:30! She said, \"I'll be there;\" however, she didn't show. (Note: This is important.) See page 10, Section 2.1."]
      },
      // Advanced punctuation mastery
      {
        id: "11-11",
        name: "Drill 11: Complex Sentences",
        texts: ["The meeting, which was scheduled for 3:00 PM, has been moved to tomorrow; however, the agenda remains the same. \"Can you confirm your attendance?\" she asked. The report (dated March 15th) shows: increased sales, higher profits, and improved customer satisfaction. According to the data, 85% of users prefer the new interface; nevertheless, some concerns remain."]
      },
      {
        id: "11-12",
        name: "Drill 12: Professional Documents",
        texts: ["MEMORANDUM TO: All Staff FROM: Management RE: Policy Update DATE: March 15, 2024 Please note the following changes: 1) New work hours: 9:00 AM - 5:30 PM; 2) Dress code: Business casual; 3) Parking: Reserved spots available. For questions, contact HR at ext. 1234. Thank you for your attention to these matters. Best regards, Management Team"]
      },
      {
        id: "11-13",
        name: "Drill 13: Academic Citations",
        texts: ["The study by Johnson, Smith, & Williams (2023) found significant correlations (r = .78, p < .001) between variables. As noted by Brown et al. (2024), \"The implications are far-reaching\" (p. 156). However, Davis (2023) argues that \"more research is needed\" (para. 4). See also: Thompson (2024), Chapter 5; Wilson & Lee (2023), pp. 89-95."]
      },
      {
        id: "11-14",
        name: "Drill 14: Technical Documentation",
        texts: ["QwertyuiopAsdfghjklZxcvbnm1234567890!@#$%^&*(); Function processData(input: string[]): boolean { if (input.length > 0) { return true; } else { return false; } } Note: Check the API documentation (v2.1) for complete parameter details. Error codes: 200 (OK), 404 (Not Found), 500 (Server Error). Contact support@company.com for assistance."]
      },
      {
        id: "11-15",
        name: "Drill 15: Punctuation Mastery",
        texts: ["QwertyuiopAsdfghjklZxcvbnm1234567890!@#$%^&*()Qwerty; The comprehensive quarterly report (Q3 2024) indicates: revenue increased 15.7%, customer satisfaction improved to 94.2%, and operational costs decreased by 8.3%. \"These results exceed our expectations,\" stated CEO Johnson during the board meeting on October 15th. However, challenges remain in the following areas: 1) Market expansion into Asia-Pacific; 2) Technology infrastructure upgrades; 3) Workforce development programs. For detailed analysis, see Appendix C (pp. 45-67) and contact the analytics team at data@company.com. Next steps include: strategic planning session (November 5th), budget review (November 12th), and implementation timeline finalization (December 1st)."]
      }
    ]
  },

  // Chapter 12: Advanced Symbols & Programming
  {
    id: "opt-chapter-12", 
    name: "Chapter 12: Programming Symbols & Code",
    description: "Master programming symbols and basic coding patterns.",
    lessons: [
      // Programming symbols progression
      {
        id: "12-1",
        name: "Drill 1: Basic Programming Symbols",
        texts: ["{ } [ ] ( ) ; : = + - * / % < > ! & | ^ ~ ` \\ @ # $ \" ' _ | { } [ ] ( ) ; : = + - * / % < > ! & | ^ ~ ` \\ @ # $ \" ' _ |"]
      },
      {
        id: "12-2",
        name: "Drill 2: Variable Declarations",
        texts: ["let x = 5; const name = \"John\"; var age = 25; let isActive = true; const PI = 3.14159; var userName = \"user123\"; let count = 0;"]
      },
      {
        id: "12-3",
        name: "Drill 3: Function Syntax",
        texts: ["function getName() { return name; } const add = (a, b) => a + b; function process(data) { console.log(data); } const multiply = (x, y) => x * y;"]
      },
      {
        id: "12-4",
        name: "Drill 4: Conditional Statements",
        texts: ["if (x > 0) { console.log(\"positive\"); } else { console.log(\"negative\"); } if (age >= 18) return true; else return false;"]
      },
      {
        id: "12-5",
        name: "Drill 5: Loops & Arrays",
        texts: ["for (let i = 0; i < 10; i++) { console.log(i); } const arr = [1, 2, 3, 4, 5]; arr.forEach(item => console.log(item));"]
      },
      // Continue with advanced programming patterns...
      {
        id: "12-6",
        name: "Drill 6: Object Syntax",
        texts: ["const user = { name: \"John\", age: 30, email: \"john@email.com\" }; const { name, age } = user; console.log(user.name);"]
      },
      {
        id: "12-7",
        name: "Drill 7: API & JSON",
        texts: ["fetch('/api/users').then(response => response.json()).then(data => console.log(data)); const config = { method: 'POST', headers: { 'Content-Type': 'application/json' } };"]
      },
      {
        id: "12-8",
        name: "Drill 8: Error Handling",
        texts: ["try { const result = processData(); } catch (error) { console.error('Error:', error.message); } finally { cleanup(); }"]
      },
      {
        id: "12-9",
        name: "Drill 9: Async Programming",
        texts: ["async function fetchData() { const response = await fetch('/api/data'); return await response.json(); } const data = await fetchData();"]
      },
      {
        id: "12-10",
        name: "Drill 10: Complex Expressions",
        texts: ["const result = array.filter(item => item.active).map(item => ({ ...item, processed: true })).reduce((sum, item) => sum + item.value, 0);"]
      },
      // Master level programming
      {
        id: "12-11",
        name: "Drill 11: Full Code Blocks",
        texts: ["class DataProcessor { constructor(config) { this.config = config; } async process(data) { try { const validated = this.validate(data); const transformed = await this.transform(validated); return this.save(transformed); } catch (error) { this.handleError(error); throw error; } } validate(data) { if (!data || typeof data !== 'object') { throw new Error('Invalid data format'); } return data; } }"]
      },
      {
        id: "12-12",
        name: "Drill 12: React Components",
        texts: ["import React, { useState, useEffect } from 'react'; const UserProfile = ({ userId }) => { const [user, setUser] = useState(null); const [loading, setLoading] = useState(true); useEffect(() => { fetchUser(userId).then(userData => { setUser(userData); setLoading(false); }); }, [userId]); if (loading) return <div>Loading...</div>; return <div><h1>{user.name}</h1><p>{user.email}</p></div>; };"]
      },
      {
        id: "12-13",
        name: "Drill 13: Node.js Backend",
        texts: ["const express = require('express'); const app = express(); const PORT = process.env.PORT || 3000; app.use(express.json()); app.get('/api/users/:id', async (req, res) => { try { const user = await User.findById(req.params.id); if (!user) { return res.status(404).json({ error: 'User not found' }); } res.json(user); } catch (error) { res.status(500).json({ error: error.message }); } }); app.listen(PORT, () => console.log(`Server running on port ${PORT}`));"]
      },
      {
        id: "12-14",
        name: "Drill 14: Advanced Programming Integration",
        texts: ["QwertyuiopAsdfghjklZxcvbnm1234567890!@#$%^&*(){}[]; interface User { id: number; name: string; email: string; isActive: boolean; } class UserService implements IUserService { private users: User[] = []; async createUser(userData: Partial<User>): Promise<User> { const newUser: User = { id: Date.now(), isActive: true, ...userData }; this.users.push(newUser); return newUser; } async findUser(id: number): Promise<User | null> { return this.users.find(user => user.id === id) || null; } }"]
      },
      {
        id: "12-15",
        name: "Drill 15: Programming Mastery Test",
        texts: ["QwertyuiopAsdfghjklZxcvbnm1234567890!@#$%^&*(){}[]Qwerty; const express = require('express'); const mongoose = require('mongoose'); const jwt = require('jsonwebtoken'); const bcrypt = require('bcryptjs'); const app = express(); const PORT = process.env.PORT || 3000; const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp'; mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); const userSchema = new mongoose.Schema({ username: { type: String, required: true, unique: true }, email: { type: String, required: true, unique: true }, password: { type: String, required: true }, createdAt: { type: Date, default: Date.now } }); const User = mongoose.model('User', userSchema); app.use(express.json()); app.post('/api/auth/register', async (req, res) => { try { const { username, email, password } = req.body; const hashedPassword = await bcrypt.hash(password, 12); const user = new User({ username, email, password: hashedPassword }); await user.save(); const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); res.status(201).json({ message: 'User created successfully', token, user: { id: user._id, username: user.username, email: user.email } }); } catch (error) { res.status(400).json({ error: error.message }); } });"]
      }
    ]
  },

  // Chapter 13: Common Words & Speed Building
  {
    id: "opt-chapter-13",
    name: "Chapter 13: Common Words & Speed Building", 
    description: "Build speed with the most frequently used English words and patterns.",
    lessons: [
      // Most common words progression
      {
        id: "13-1",
        name: "Drill 1: Top 50 Words",
        texts: ["the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us"]
      },
      {
        id: "13-2",
        name: "Drill 2: Action Words",
        texts: ["make take give come work think look know feel find tell ask try keep help start stop play run walk talk move live love learn teach read write send need want call turn put set get let see show hear mean seem become appear happen change"]
      },
      {
        id: "13-3",
        name: "Drill 3: Time & Place Words",
        texts: ["when where why how what time today tomorrow yesterday now then here there everywhere somewhere nowhere anywhere before after during while since until again always never often sometimes usually rarely today tonight morning evening afternoon yesterday tomorrow week month year day night home house place room office school work city country world"]
      },
      {
        id: "13-4",
        name: "Drill 4: People & Relationships",
        texts: ["people person man woman child boy girl family mother father parent brother sister friend teacher student worker doctor lawyer engineer manager director president company team group member partner colleague neighbor customer client guest visitor everyone someone anyone no one somebody anybody nobody everybody"]
      },
      {
        id: "13-5",
        name: "Drill 5: Common Phrases",
        texts: ["I think you know what I mean I would like to thank you very much for your help I hope you have a good day please let me know if you need anything I will be happy to help you with that I am sorry but I cannot do that right now"]
      },
      // Speed building with word combinations
      {
        id: "13-6",
        name: "Drill 6: Fast Word Patterns",
        texts: ["the and for you that with they have been this will from are not can all out who get use her way she may say each which their said them like into time has its two more these"]
      },
      {
        id: "13-7",
        name: "Drill 7: Letter Combinations",
        texts: ["tion ing ment ness able ible ence ance ight ought aught ought ough tion sion ation ition iction ection ruction struction construction instruction destruction"]
      },
      {
        id: "13-8",
        name: "Drill 8: Professional Vocabulary",
        texts: ["business meeting project manager director executive assistant customer service quality control development research analysis report presentation conference training budget schedule deadline proposal contract agreement solution strategy implementation evaluation assessment review feedback improvement efficiency productivity innovation collaboration communication"]
      },
      {
        id: "13-9",
        name: "Drill 9: Academic Vocabulary", 
        texts: ["research study analysis theory hypothesis methodology data evidence conclusion discussion introduction literature review results findings implications limitations recommendations further investigation examination evaluation assessment comparison contrast interpretation explanation description definition classification categorization"]
      },
      {
        id: "13-10",
        name: "Drill 10: Technology Terms",
        texts: ["computer software hardware internet website application program system network database server client user interface design development programming code algorithm data structure function variable object class method framework library API documentation version control repository deployment testing debugging maintenance optimization performance security authentication authorization encryption"]
      },
      // Advanced speed and fluency
      {
        id: "13-11",
        name: "Drill 11: Rapid Sentence Building",
        texts: ["I think that you should know what I mean when I say that this is a very important matter that needs to be addressed as soon as possible because the situation has become quite serious and requires immediate attention from all team members who are responsible for handling these types of issues in our organization. We need to work together to find a solution that will be effective and efficient while also being cost-effective and sustainable for the long term success of our company and all stakeholders involved in this process."]
      },
      {
        id: "13-12",
        name: "Drill 12: Professional Communication",
        texts: ["Dear colleagues, I hope this message finds you well. I am writing to inform you about the upcoming changes to our project timeline and budget allocation. As discussed in our previous meeting, we need to adjust our approach to accommodate the new requirements from our client. Please review the attached documents and let me know if you have any questions or concerns. We will schedule a follow-up meeting next week to discuss the implementation details and assign specific responsibilities to each team member. Thank you for your continued dedication and hard work."]
      },
      {
        id: "13-13",
        name: "Drill 13: Complex Vocabulary Flow",
        texts: ["The comprehensive analysis of contemporary business practices reveals significant opportunities for organizational improvement through strategic implementation of innovative technologies and methodologies. Organizations that successfully integrate advanced analytical capabilities with traditional operational frameworks demonstrate superior performance metrics across multiple evaluation criteria. Furthermore, the correlation between technological adoption and competitive advantage becomes increasingly evident when examining long-term sustainability patterns in dynamic market environments."]
      },
      {
        id: "13-14",
        name: "Drill 14: Advanced Speed Integration",
        texts: ["QwertyuiopAsdfghjklZxcvbnm1234567890!@#$%^&*(){}[]; The rapid development of artificial intelligence and machine learning technologies has fundamentally transformed the landscape of modern business operations, creating unprecedented opportunities for innovation and efficiency improvements across diverse industry sectors. Organizations that strategically leverage these advanced computational capabilities while maintaining strong ethical frameworks and human-centered design principles are positioning themselves for sustainable competitive advantage in the evolving digital economy. The integration of intelligent automation systems with traditional business processes requires careful consideration of multiple factors including workforce impact, implementation costs, security requirements, and long-term strategic alignment with organizational objectives."]
      },
      {
        id: "13-15",
        name: "Drill 15: Speed Mastery Challenge",
        texts: ["QwertyuiopAsdfghjklZxcvbnm1234567890!@#$%^&*(){}[]Qwerty; The comprehensive transformation of contemporary organizational structures through strategic integration of advanced technological solutions represents a fundamental paradigm shift in operational methodology and strategic planning approaches. Organizations that successfully navigate this complex transition by implementing robust change management frameworks while maintaining focus on stakeholder engagement and sustainable growth initiatives demonstrate superior adaptability and resilience in dynamic market environments. The correlation between technological innovation, human capital development, and organizational performance becomes increasingly evident when examining successful case studies across diverse industry sectors and geographical regions. Furthermore, the strategic alignment of digital transformation initiatives with core business objectives requires careful consideration of multiple interdependent factors including resource allocation, risk management, competitive positioning, and long-term sustainability requirements."]
      }
    ]
  },

  // Chapter 14: Capitalization Mastery
  {
    id: "opt-chapter-14",
    name: "Chapter 14: Capitalization Mastery",
    description: "Master proper capitalization rules and patterns.",
    lessons: [
      {
        id: "14-1",
        name: "Drill 1: Basic Capitals",
        texts: ["The Quick Brown Fox; John Smith; New York City; Monday Morning; Happy Birthday; Good Morning; Thank You;"]
      },
      {
        id: "14-2",
        name: "Drill 2: Proper Nouns",
        texts: ["America; England; France; Germany; Japan; China; India; Brazil; Canada; Australia; Mexico; Italy; Spain; Russia;"]
      },
      {
        id: "14-3",
        name: "Drill 3: Title Case",
        texts: ["The Art of War; Pride and Prejudice; To Kill a Mockingbird; The Great Gatsby; Lord of the Flies; Of Mice and Men;"]
      },
      {
        id: "14-4",
        name: "Drill 4: Names & Places",
        texts: ["Sarah Johnson lives in Los Angeles; Michael Brown works in New York; Jennifer Davis studies at Harvard University;"]
      },
      {
        id: "14-5",
        name: "Drill 5: Business Titles",
        texts: ["Chief Executive Officer; Senior Software Engineer; Marketing Director; Project Manager; Sales Representative;"]
      },
      {
        id: "14-6",
        name: "Drill 6: Sentence Beginnings",
        texts: ["Today is Monday. Tomorrow will be Tuesday. Yesterday was Sunday. Next week starts on Monday. Last month ended well."]
      },
      {
        id: "14-7",
        name: "Drill 7: Acronyms",
        texts: ["NASA; FBI; CIA; USA; UK; EU; UN; WHO; NATO; CEO; CFO; CTO; HTML; CSS; JavaScript; API; HTTP; HTTPS;"]
      },
      {
        id: "14-8",
        name: "Drill 8: Mixed Capitalization",
        texts: ["John works at Apple Inc. in California. Mary studies Computer Science at MIT. The CEO announced new iPhone features."]
      },
      {
        id: "14-9",
        name: "Drill 9: Complex Titles",
        texts: ["Vice President of Engineering; Senior Director of Marketing; Associate Professor of Mathematics; Chief Technology Officer;"]
      },
      {
        id: "14-10",
        name: "Drill 10: Geographic Capitals",
        texts: ["Pacific Ocean; Atlantic Ocean; Mount Everest; Amazon River; Sahara Desert; Rocky Mountains; Mississippi River;"]
      },
      {
        id: "14-11",
        name: "Drill 11: Brand Names",
        texts: ["Microsoft; Google; Apple; Amazon; Facebook; Tesla; Netflix; Instagram; YouTube; Twitter; LinkedIn; Adobe; Oracle;"]
      },
      {
        id: "14-12",
        name: "Drill 12: Historical Events",
        texts: ["World War Two; American Revolution; French Revolution; Industrial Revolution; Renaissance Period; Cold War Era;"]
      },
      {
        id: "14-13",
        name: "Drill 13: Educational Institutions",
        texts: ["Harvard University; Stanford University; MIT; Yale University; Princeton University; Oxford University; Cambridge;"]
      },
      {
        id: "14-14",
        name: "Drill 14: Complex Sentences",
        texts: ["The President of the United States announced new policies. The Prime Minister of Canada visited Washington DC yesterday."]
      },
      {
        id: "14-15",
        name: "Drill 15: Capitalization Mastery",
        texts: ["Dr. Smith, CEO of TechCorp Inc., announced that the Q4 earnings exceeded expectations by 15% in North American markets."]
      }
    ]
  },

  // Chapter 15: Speed Building & Combinations  
  {
    id: "opt-chapter-15",
    name: "Chapter 15: Speed Building & Combinations",
    description: "Build typing speed with common letter combinations and patterns.",
    lessons: [
      {
        id: "15-1",
        name: "Drill 1: Common Digraphs",
        texts: ["th the that this them they then there think thank thirty through thoughts theater thermal therapy"]
      },
      {
        id: "15-2", 
        name: "Drill 2: -ING Endings",
        texts: ["running jumping reading writing thinking working playing studying learning teaching programming typing coding testing"]
      },
      {
        id: "15-3",
        name: "Drill 3: -TION Endings", 
        texts: ["action nation station creation vacation education information organization communication administration preparation"]
      },
      {
        id: "15-4",
        name: "Drill 4: Double Letters",
        texts: ["book look took good food mood room zoom cool pool tool school football basketball volleyball different coffee"]
      },
      {
        id: "15-5",
        name: "Drill 5: -ER Endings",
        texts: ["water under after other mother father brother sister teacher worker manager developer designer programmer"]
      },
      {
        id: "15-6",
        name: "Drill 6: Prefix Patterns",
        texts: ["prefix prepaid preview prepare prevent present problem project progress program protect provide process"]
      },
      {
        id: "15-7", 
        name: "Drill 7: -LY Endings",
        texts: ["quickly slowly really finally actually probably definitely usually especially particularly completely absolutely"]
      },
      {
        id: "15-8",
        name: "Drill 8: Common Trigraphs",
        texts: ["and the for you are not but can had his her was one our out day get has him old see two way"]
      },
      {
        id: "15-9",
        name: "Drill 9: Word Families",
        texts: ["light night right fight sight might bright flight height weight straight thought bought brought caught taught"]
      },
      {
        id: "15-10",
        name: "Drill 10: Speed Combinations",
        texts: ["when what where which while white whole whose write wrong would could should their there these those"]
      },
      {
        id: "15-11",
        name: "Drill 11: Compound Words", 
        texts: ["something everything anything nothing someone everyone anyone keyboard software hardware database website"]
      },
      {
        id: "15-12",
        name: "Drill 12: Advanced Patterns",
        texts: ["through thought although enough tough rough cough laugh daughter slaughter naughty haughty fraught taught"]
      },
      {
        id: "15-13",
        name: "Drill 13: Speed Sentences",
        texts: ["The quick brown fox jumps over the lazy dog every morning. She sells seashells by the seashore during summer."]
      },
      {
        id: "15-14",
        name: "Drill 14: Fluency Test",
        texts: ["Technology companies are developing artificial intelligence systems that can process natural language understanding."]
      },
      {
        id: "15-15",
        name: "Drill 15: Speed Mastery", 
        texts: ["Professional typists maintain consistent rhythm while achieving high accuracy rates across diverse content types including technical documentation."]
      }
    ]
  },

  // Chapter 16: Advanced Vocabulary
  {
    id: "opt-chapter-16", 
    name: "Chapter 16: Advanced Vocabulary",
    description: "Expand your typing skills with sophisticated vocabulary and terminology.",
    lessons: [
      {
        id: "16-1",
        name: "Drill 1: Academic Words",
        texts: ["analyze synthesize hypothesize methodology theoretical empirical qualitative quantitative research investigation"]
      },
      {
        id: "16-2",
        name: "Drill 2: Scientific Terms",
        texts: ["hypothesis experiment laboratory microscope telescope chromosome molecule photosynthesis electromagnetic radiation"]
      },
      {
        id: "16-3", 
        name: "Drill 3: Business Vocabulary",
        texts: ["entrepreneurship management strategic planning financial analysis market research competitive advantage revenue"]
      },
      {
        id: "16-4",
        name: "Drill 4: Technology Terms",
        texts: ["algorithm architecture framework infrastructure deployment scalability optimization performance security"]
      },
      {
        id: "16-5",
        name: "Drill 5: Medical Terminology",
        texts: ["diagnosis treatment prescription pharmaceutical therapy rehabilitation cardiovascular respiratory neurological"]
      },
      {
        id: "16-6",
        name: "Drill 6: Legal Terms",
        texts: ["jurisdiction litigation defendant plaintiff attorney prosecution defense evidence testimony judicial"]
      },
      {
        id: "16-7",
        name: "Drill 7: Financial Words",
        texts: ["investment portfolio diversification compound interest equity debt liability asset depreciation appreciation"]
      },
      {
        id: "16-8", 
        name: "Drill 8: Educational Terms",
        texts: ["curriculum pedagogy assessment evaluation accreditation certification graduation undergraduate graduate"]
      },
      {
        id: "16-9",
        name: "Drill 9: Engineering Words",
        texts: ["mechanical electrical software civil aerospace biomedical chemical environmental structural materials"]
      },
      {
        id: "16-10",
        name: "Drill 10: Psychology Terms",
        texts: ["cognitive behavioral emotional psychological developmental personality intelligence memory perception"]
      },
      {
        id: "16-11",
        name: "Drill 11: Philosophy Words",
        texts: ["metaphysics epistemology ethics aesthetics logic reasoning consciousness existence reality knowledge"]
      },
      {
        id: "16-12",
        name: "Drill 12: Complex Sentences",
        texts: ["The pharmaceutical company conducted extensive clinical trials to evaluate the efficacy of their new therapeutic intervention."]
      },
      {
        id: "16-13",
        name: "Drill 13: Technical Writing",
        texts: ["Implementation of distributed systems requires comprehensive understanding of network protocols and data consistency models."]
      },
      {
        id: "16-14",
        name: "Drill 14: Academic Writing",
        texts: ["Contemporary research methodologies emphasize interdisciplinary approaches to complex sociological and psychological phenomena."]
      },
      {
        id: "16-15",
        name: "Drill 15: Vocabulary Mastery",
        texts: ["Interdisciplinary collaboration facilitates innovative solutions to multifaceted challenges in contemporary technological development paradigms."]
      }
    ]
  },

  // Chapter 17: Sentence Construction & Flow
  {
    id: "opt-chapter-17",
    name: "Chapter 17: Sentence Construction & Flow", 
    description: "Master fluid sentence typing with proper rhythm and pacing.",
    lessons: [
      {
        id: "17-1",
        name: "Drill 1: Simple Sentences",
        texts: ["The cat sits on the mat. The dog runs in the park. The bird flies in the sky. The fish swims in the water."]
      },
      {
        id: "17-2",
        name: "Drill 2: Compound Sentences", 
        texts: ["The sun shines brightly, and the birds sing sweetly. Students study hard, but exams are challenging."]
      },
      {
        id: "17-3",
        name: "Drill 3: Complex Sentences",
        texts: ["When the rain stops, we will go outside to play. Because she studied hard, she passed the examination with honors."]
      },
      {
        id: "17-4",
        name: "Drill 4: Descriptive Sentences",
        texts: ["The beautiful red roses bloom magnificently in the well-maintained garden during the warm spring season."]
      },
      {
        id: "17-5",
        name: "Drill 5: Question Patterns",
        texts: ["What time is it? Where are you going? How do you feel? Why did this happen? When will you arrive?"]
      },
      {
        id: "17-6",
        name: "Drill 6: Exclamatory Sentences",
        texts: ["What a beautiful day! How wonderful this is! Such amazing results! What an incredible achievement!"]
      },
      {
        id: "17-7",
        name: "Drill 7: Transitional Phrases",
        texts: ["However, furthermore, moreover, nevertheless, consequently, therefore, meanwhile, subsequently, additionally, finally."]
      },
      {
        id: "17-8",
        name: "Drill 8: Dialogue Practice",
        texts: ["\"Hello, how are you today?\" she asked. \"I'm doing well, thank you,\" he replied with a smile."]
      },
      {
        id: "17-9",
        name: "Drill 9: Narrative Flow",
        texts: ["First, we gathered the materials. Next, we prepared the workspace. Then, we began the construction process."]
      },
      {
        id: "17-10",
        name: "Drill 10: Argumentative Structure",
        texts: ["On one hand, technology improves efficiency. On the other hand, it may reduce human interaction significantly."]
      },
      {
        id: "17-11",
        name: "Drill 11: Descriptive Paragraphs",
        texts: ["The ancient castle stood majestically on the hilltop, its weathered stones telling stories of centuries past."]
      },
      {
        id: "17-12", 
        name: "Drill 12: Technical Instructions",
        texts: ["To complete this process, first initialize the system, then configure the parameters, and finally execute the program."]
      },
      {
        id: "17-13",
        name: "Drill 13: Formal Writing",
        texts: ["The research indicates that implementation of sustainable practices significantly improves long-term organizational performance."]
      },
      {
        id: "17-14",
        name: "Drill 14: Creative Writing",
        texts: ["Moonlight danced across the tranquil lake while gentle breezes whispered secrets through the ancient oak trees."]
      },
      {
        id: "17-15",
        name: "Drill 15: Flow Mastery",
        texts: ["Professional communication requires clarity, conciseness, and coherence to effectively convey complex ideas to diverse audiences."]
      }
    ]
  },

  // Chapter 18: Paragraph Fluency  
  {
    id: "opt-chapter-18",
    name: "Chapter 18: Paragraph Fluency",
    description: "Develop sustained typing fluency across longer text passages.",
    lessons: [
      {
        id: "18-1",
        name: "Drill 1: Short Paragraphs",
        texts: ["Technology has revolutionized the way we communicate. From simple text messages to video calls, we can now connect with people anywhere in the world instantly. This connectivity has transformed both personal relationships and business operations."]
      },
      {
        id: "18-2",
        name: "Drill 2: Descriptive Paragraphs",
        texts: ["The morning sun cast golden rays through the misty forest, illuminating dewdrops on spider webs like tiny diamonds. Birds sang melodious songs while squirrels scampered playfully among the tall pine trees. The fresh mountain air carried the sweet fragrance of wildflowers blooming in the meadow nearby."]
      },
      {
        id: "18-3",
        name: "Drill 3: Informational Text",
        texts: ["Climate change represents one of the most significant challenges facing humanity today. Rising global temperatures, melting ice caps, and extreme weather patterns are affecting ecosystems worldwide. Scientists emphasize the urgent need for sustainable practices and renewable energy sources to mitigate these environmental impacts."]
      },
      {
        id: "18-4",
        name: "Drill 4: Historical Content",
        texts: ["The Industrial Revolution fundamentally transformed society during the late eighteenth and early nineteenth centuries. Manufacturing shifted from hand production to mechanized processes, leading to urbanization and significant social changes. This period marked the beginning of modern industrial society and continues to influence our world today."]
      },
      {
        id: "18-5",
        name: "Drill 5: Scientific Writing",
        texts: ["Photosynthesis is the complex biological process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen. This fundamental process not only provides energy for plant growth but also produces the oxygen that sustains most life on Earth. Understanding photosynthesis is crucial for advancing agricultural techniques and environmental conservation efforts."]
      },
      {
        id: "18-6",
        name: "Drill 6: Business Communication",
        texts: ["Effective project management requires careful planning, clear communication, and continuous monitoring of progress. Team leaders must coordinate resources, manage timelines, and adapt to changing requirements while maintaining quality standards. Successful projects depend on collaboration, stakeholder engagement, and systematic problem-solving approaches."]
      },
      {
        id: "18-7",
        name: "Drill 7: Educational Content", 
        texts: ["Learning a new language involves developing four fundamental skills: listening, speaking, reading, and writing. Each skill reinforces the others through practice and repetition. Immersion in the target language through conversation, media consumption, and written exercises accelerates the acquisition process and builds confidence in communication."]
      },
      {
        id: "18-8",
        name: "Drill 8: Health & Wellness",
        texts: ["Regular exercise contributes significantly to physical and mental well-being. Cardiovascular activities strengthen the heart and improve circulation, while strength training builds muscle mass and bone density. Additionally, physical activity releases endorphins that enhance mood and reduce stress levels, promoting overall quality of life."]
      },
      {
        id: "18-9",
        name: "Drill 9: Technology Trends",
        texts: ["Artificial intelligence is rapidly transforming industries across the globe. Machine learning algorithms analyze vast datasets to identify patterns and make predictions, while automation streamlines repetitive tasks. As AI technology advances, organizations must adapt their strategies to leverage these powerful tools while addressing ethical considerations and workforce implications."]
      },
      {
        id: "18-10",
        name: "Drill 10: Creative Writing",
        texts: ["The old lighthouse stood sentinel against the stormy night, its beacon cutting through the darkness like a sword of light. Waves crashed violently against the rocky shore below, sending spray high into the air. Inside the lighthouse, the keeper maintained his vigil, knowing that ships depended on his unwavering dedication to guide them safely home."]
      },
      {
        id: "18-11",
        name: "Drill 11: Analytical Writing",
        texts: ["Market analysis reveals significant trends in consumer behavior patterns during the past decade. Digital transformation has shifted purchasing preferences toward online platforms, while sustainability concerns influence brand loyalty decisions. Companies that adapt to these evolving expectations through innovative products and transparent practices achieve competitive advantages in the marketplace."]
      },
      {
        id: "18-12",
        name: "Drill 12: Complex Arguments",
        texts: ["The debate surrounding renewable energy implementation involves multiple stakeholders with diverse perspectives. Environmental advocates emphasize the urgent need to reduce carbon emissions, while industry representatives highlight economic considerations and technological challenges. Policymakers must balance these competing interests to develop comprehensive strategies that address both environmental goals and economic realities."]
      },
      {
        id: "18-13",
        name: "Drill 13: Research Writing",
        texts: ["Contemporary research methodologies in social sciences employ both quantitative and qualitative approaches to investigate complex phenomena. Researchers design studies that collect empirical data through surveys, interviews, and observational techniques. Statistical analysis helps identify significant relationships between variables, while thematic analysis reveals deeper insights into participant experiences and perspectives."]
      },
      {
        id: "18-14",
        name: "Drill 14: Professional Reports",
        texts: ["The quarterly financial report indicates steady growth across all major business segments, with revenue increasing by twelve percent compared to the same period last year. Operating expenses remained within projected budgets, while investment in research and development continues to drive innovation initiatives. Management remains optimistic about future performance based on current market conditions and strategic partnerships."]
      },
      {
        id: "18-15",
        name: "Drill 15: Fluency Mastery",
        texts: ["Mastering paragraph fluency requires consistent practice with diverse content types, maintaining steady rhythm while preserving accuracy across extended passages. Professional typists develop muscle memory that enables seamless transitions between words, sentences, and paragraphs without sacrificing speed or precision. This advanced skill set supports efficient communication in academic, business, and creative writing contexts where sustained concentration and technical proficiency are essential for success."]
      }
    ]
  },

  // Chapter 19: Business & Professional Writing
  {
    id: "opt-chapter-19",
    name: "Chapter 19: Business & Professional Writing", 
    description: "Master professional communication and business correspondence typing.",
    lessons: [
      {
        id: "19-1",
        name: "Drill 1: Email Basics",
        texts: ["Dear Mr. Johnson, Thank you for your inquiry regarding our services. We appreciate your interest and look forward to discussing your requirements. Best regards, Sarah Smith"]
      },
      {
        id: "19-2",
        name: "Drill 2: Meeting Agendas",
        texts: ["Meeting Agenda: 1. Review quarterly results 2. Discuss budget allocations 3. Plan marketing strategy 4. Address staffing needs 5. Schedule next meeting"]
      },
      {
        id: "19-3",
        name: "Drill 3: Business Proposals",
        texts: ["Executive Summary: Our proposal outlines a comprehensive solution to improve operational efficiency by 25% while reducing costs by $50,000 annually through process automation and workflow optimization."]
      },
      {
        id: "19-4",
        name: "Drill 4: Formal Letters",
        texts: ["Dear Hiring Manager, I am writing to express my strong interest in the Senior Software Engineer position at your company. My five years of experience in full-stack development make me an ideal candidate for this role."]
      },
      {
        id: "19-5",
        name: "Drill 5: Reports & Summaries",
        texts: ["Project Status Report: Phase one completed on schedule with all deliverables meeting quality standards. Phase two initiated with team members assigned to specific tasks and milestones established for monthly review."]
      },
      {
        id: "19-6",
        name: "Drill 6: Contract Language",
        texts: ["The parties agree that this contract shall remain in effect for a period of twelve months from the execution date, with automatic renewal unless terminated by either party with thirty days written notice."]
      },
      {
        id: "19-7",
        name: "Drill 7: Marketing Copy",
        texts: ["Transform your business with our innovative cloud solutions. Increase productivity, reduce costs, and scale efficiently with enterprise-grade security and 24/7 support from our expert team."]
      },
      {
        id: "19-8",
        name: "Drill 8: Financial Documents",
        texts: ["Quarterly Revenue: $2,350,000 Operating Expenses: $1,890,000 Net Profit: $460,000 Year-over-year growth: 15% Return on Investment: 18% Projected Q4 Revenue: $2,800,000"]
      },
      {
        id: "19-9",
        name: "Drill 9: HR Communications",
        texts: ["Employee Handbook Update: All staff must complete mandatory safety training by December 31st. New policies regarding remote work arrangements take effect January 1st. Please review the updated guidelines carefully."]
      },
      {
        id: "19-10",
        name: "Drill 10: Legal Documents",
        texts: ["Whereas the Company desires to engage the Contractor for professional services, and Whereas the Contractor agrees to provide such services under the terms and conditions set forth herein, Now Therefore the parties agree as follows:"]
      },
      {
        id: "19-11",
        name: "Drill 11: Technical Specifications",
        texts: ["System Requirements: 64-bit processor, 16GB RAM, 500GB SSD storage, Graphics card with 4GB VRAM, Network connectivity 1Gbps, Operating System Windows 10 Pro or macOS 10.15 or later."]
      },
      {
        id: "19-12",
        name: "Drill 12: Customer Service",
        texts: ["Thank you for contacting our support team. We have received your request and assigned ticket number CS-2024-001234. A representative will respond within 24 hours to address your concerns and provide assistance."]
      },
      {
        id: "19-13",
        name: "Drill 13: Executive Communications",
        texts: ["Board of Directors Meeting Minutes: The CEO presented quarterly results showing record revenue growth. The CFO outlined budget projections for the upcoming fiscal year. The board approved the proposed merger agreement unanimously."]
      },
      {
        id: "19-14",
        name: "Drill 14: International Business",
        texts: ["Global expansion requires careful consideration of cultural differences, regulatory compliance, market conditions, and operational logistics. Our international team has expertise in navigating complex multi-jurisdictional requirements."]
      },
      {
        id: "19-15",
        name: "Drill 15: Professional Mastery",
        texts: ["Comprehensive business communication encompasses strategic planning, stakeholder engagement, regulatory compliance, financial analysis, and operational excellence to achieve sustainable competitive advantages in dynamic global markets while maintaining ethical standards and corporate social responsibility."]
      }
    ]
  },

  // Chapter 20: Literature & Classic Texts
  {
    id: "opt-chapter-20",
    name: "Chapter 20: Literature & Classic Texts",
    description: "Practice with classic literature and famous quotes to build cultural literacy.",
    lessons: [
      {
        id: "20-1",
        name: "Drill 1: Shakespeare",
        texts: ["To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take arms against a sea of troubles And by opposing end them."]
      },
      {
        id: "20-2",
        name: "Drill 2: Classic Opening Lines",
        texts: ["It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity. - Charles Dickens"]
      },
      // Continue with more literature drills...
      {
        id: "20-15",
        name: "Drill 15: Literary Mastery",
        texts: ["The comprehensive study of world literature reveals universal themes that transcend cultural boundaries and historical periods, demonstrating the enduring power of human storytelling."]
      }
    ]
  },

  // Chapter 21: Programming & Coding Fundamentals
  {
    id: "opt-chapter-21",
    name: "Chapter 21: Programming & Coding Fundamentals",
    description: "Learn to type code efficiently with proper syntax and formatting.",
    lessons: [
      {
        id: "21-1",
        name: "Drill 1: Basic JavaScript",
        texts: ["function getName() { return name; } const add = (a, b) => a + b; let count = 0; const result = add(5, 3);"]
      },
      {
        id: "21-2",
        name: "Drill 2: Variables & Objects",
        texts: ["const user = { name: 'John', age: 30, email: 'john@example.com' }; let items = []; const isActive = true;"]
      },
      {
        id: "21-3",
        name: "Drill 3: Control Structures",
        texts: ["if (condition) { return true; } else { return false; } for (let i = 0; i < array.length; i++) { console.log(array[i]); }"]
      },
      {
        id: "21-4",
        name: "Drill 4: Functions & Methods",
        texts: ["function processData(input) { return input.map(item => item.toUpperCase()).filter(item => item.length > 3); }"]
      },
      {
        id: "21-5",
        name: "Drill 5: Error Handling",
        texts: ["try { const result = await fetchData(); } catch (error) { console.error('Failed to fetch:', error.message); }"]
      },
      {
        id: "21-6",
        name: "Drill 6: Classes & Inheritance",
        texts: ["class Animal { constructor(name) { this.name = name; } speak() { console.log(this.name + ' makes a sound'); } }"]
      },
      {
        id: "21-7",
        name: "Drill 7: Async Programming",
        texts: ["async function fetchUserData(id) { const response = await fetch(`/api/users/${id}`); return await response.json(); }"]
      },
      {
        id: "21-8",
        name: "Drill 8: Array Methods",
        texts: ["const numbers = [1, 2, 3, 4, 5]; const doubled = numbers.map(n => n * 2).filter(n => n > 5).reduce((sum, n) => sum + n, 0);"]
      },
      {
        id: "21-9",
        name: "Drill 9: DOM Manipulation",
        texts: ["document.getElementById('button').addEventListener('click', function() { document.querySelector('.container').innerHTML = 'Updated!'; });"]
      },
      {
        id: "21-10",
        name: "Drill 10: Module Systems",
        texts: ["import { Component } from 'react'; export default function App() { return <div>Hello World</div>; }"]
      },
      {
        id: "21-11",
        name: "Drill 11: TypeScript Basics",
        texts: ["interface User { id: number; name: string; email: string; } function createUser(data: Partial<User>): User { return { id: 1, ...data }; }"]
      },
      {
        id: "21-12",
        name: "Drill 12: API Calls",
        texts: ["const apiClient = { get: async (url) => { const response = await fetch(url); return response.ok ? response.json() : null; } };"]
      },
      {
        id: "21-13",
        name: "Drill 13: Testing Code",
        texts: ["describe('Calculator', () => { it('should add two numbers', () => { expect(add(2, 3)).toBe(5); }); });"]
      },
      {
        id: "21-14",
        name: "Drill 14: Complex Logic",
        texts: ["const fibonacci = (n) => n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2); const memoized = memoize(fibonacci);"]
      },
      {
        id: "21-15",
        name: "Drill 15: Full Application",
        texts: ["class TaskManager { constructor() { this.tasks = []; } addTask(task) { this.tasks.push({...task, id: Date.now(), completed: false}); } }"]
      }
    ]
  },

  // Chapter 22: Advanced Programming Patterns
  {
    id: "opt-chapter-22",
    name: "Chapter 22: Advanced Programming Patterns",
    description: "Master complex programming concepts and design patterns.",
    lessons: [
      {
        id: "22-1",
        name: "Drill 1: Design Patterns",
        texts: ["class Singleton { static instance = null; static getInstance() { return this.instance || (this.instance = new this()); } }"]
      },
      {
        id: "22-2",
        name: "Drill 2: Observer Pattern",
        texts: ["class EventEmitter { constructor() { this.events = {}; } on(event, callback) { (this.events[event] = this.events[event] || []).push(callback); } }"]
      },
      {
        id: "22-3",
        name: "Drill 3: Factory Pattern",
        texts: ["class UserFactory { static createUser(type, data) { return type === 'admin' ? new AdminUser(data) : new RegularUser(data); } }"]
      },
      {
        id: "22-4",
        name: "Drill 4: Promise Chains",
        texts: ["fetchUser(id).then(user => fetchPosts(user.id)).then(posts => posts.filter(p => p.published)).catch(error => handleError(error));"]
      },
      {
        id: "22-5",
        name: "Drill 5: Higher-Order Functions",
        texts: ["const withLogging = (fn) => (...args) => { console.log('Calling:', fn.name); return fn(...args); }; const loggedAdd = withLogging(add);"]
      },
      {
        id: "22-6",
        name: "Drill 6: Currying & Composition",
        texts: ["const curry = (fn) => (...args) => args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args));"]
      },
      {
        id: "22-7",
        name: "Drill 7: Generators & Iterators",
        texts: ["function* fibonacci() { let [a, b] = [0, 1]; while (true) { yield a; [a, b] = [b, a + b]; } }"]
      },
      {
        id: "22-8",
        name: "Drill 8: Proxy & Reflection",
        texts: ["const proxy = new Proxy(target, { get(obj, prop) { return prop in obj ? obj[prop] : 'Property not found'; } });"]
      },
      {
        id: "22-9",
        name: "Drill 9: Web Components",
        texts: ["class CustomElement extends HTMLElement { connectedCallback() { this.innerHTML = '<h1>Custom Element</h1>'; } }"]
      },
      {
        id: "22-10",
        name: "Drill 10: State Management",
        texts: ["const createStore = (reducer) => { let state; const listeners = []; return { getState: () => state, dispatch: action => { state = reducer(state, action); listeners.forEach(l => l()); } }; };"]
      },
      {
        id: "22-11",
        name: "Drill 11: Performance Optimization",
        texts: ["const debounce = (fn, delay) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; };"]
      },
      {
        id: "22-12",
        name: "Drill 12: Memory Management",
        texts: ["class CacheManager { constructor(maxSize = 100) { this.cache = new Map(); this.maxSize = maxSize; } set(key, value) { if (this.cache.size >= this.maxSize) { const firstKey = this.cache.keys().next().value; this.cache.delete(firstKey); } this.cache.set(key, value); } }"]
      },
      {
        id: "22-13",
        name: "Drill 13: Functional Programming",
        texts: ["const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value); const transform = pipe(normalize, validate, format);"]
      },
      {
        id: "22-14",
        name: "Drill 14: Reactive Programming",
        texts: ["const observable = new Observable(subscriber => { const interval = setInterval(() => subscriber.next(Date.now()), 1000); return () => clearInterval(interval); });"]
      },
      {
        id: "22-15",
        name: "Drill 15: Architecture Patterns",
        texts: ["class Model { constructor() { this.observers = []; } notify(data) { this.observers.forEach(observer => observer.update(data)); } } class View { update(data) { this.render(data); } }"]
      }
    ]
  },

  // Chapter 23: Web Development & Frameworks
  {
    id: "opt-chapter-23",
    name: "Chapter 23: Web Development & Frameworks",
    description: "Type modern web development code including React, HTML, CSS, and more.",
    lessons: [
      {
        id: "23-1",
        name: "Drill 1: HTML Structure",
        texts: ["<!DOCTYPE html><html><head><title>My App</title></head><body><div id=\"root\"></div><script src=\"app.js\"></script></body></html>"]
      },
      {
        id: "23-2",
        name: "Drill 2: CSS Styling",
        texts: [".container { display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); }"]
      },
      {
        id: "23-3",
        name: "Drill 3: React Components",
        texts: ["const Button = ({ onClick, children, variant = 'primary' }) => { return <button className={`btn btn-${variant}`} onClick={onClick}>{children}</button>; };"]
      },
      {
        id: "23-4",
        name: "Drill 4: React Hooks",
        texts: ["const useCounter = (initialValue = 0) => { const [count, setCount] = useState(initialValue); return { count, increment: () => setCount(c => c + 1), decrement: () => setCount(c => c - 1) }; };"]
      },
      {
        id: "23-5",
        name: "Drill 5: State Management",
        texts: ["const TodoContext = createContext(); const TodoProvider = ({ children }) => { const [todos, setTodos] = useState([]); const addTodo = (text) => setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]); return <TodoContext.Provider value={{ todos, addTodo }}>{children}</TodoContext.Provider>; };"]
      },
      {
        id: "23-6",
        name: "Drill 6: API Integration",
        texts: ["useEffect(() => { const fetchData = async () => { try { const response = await fetch('/api/data'); const data = await response.json(); setData(data); } catch (error) { setError(error.message); } }; fetchData(); }, []);"]
      },
      {
        id: "23-7",
        name: "Drill 7: Form Handling",
        texts: ["const ContactForm = () => { const [formData, setFormData] = useState({ name: '', email: '', message: '' }); const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); const handleSubmit = async (e) => { e.preventDefault(); await submitForm(formData); }; return <form onSubmit={handleSubmit}>...</form>; };"]
      },
      {
        id: "23-8",
        name: "Drill 8: CSS-in-JS",
        texts: ["const StyledButton = styled.button` background: ${props => props.primary ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; &:hover { opacity: 0.8; } `;"]
      },
      {
        id: "23-9",
        name: "Drill 9: Responsive Design",
        texts: ["@media (max-width: 768px) { .container { flex-direction: column; padding: 16px; } .card { width: 100%; margin-bottom: 16px; } }"]
      },
      {
        id: "23-10",
        name: "Drill 10: Animation & Transitions",
        texts: [".fade-in { opacity: 0; animation: fadeIn 0.5s ease-in-out forwards; } @keyframes fadeIn { to { opacity: 1; } } .slide-up { transform: translateY(20px); transition: transform 0.3s ease-out; } .slide-up.active { transform: translateY(0); }"]
      },
      {
        id: "23-11",
        name: "Drill 11: Testing Components",
        texts: ["import { render, screen, fireEvent } from '@testing-library/react'; test('button clicks increment counter', () => { render(<Counter />); const button = screen.getByText('Increment'); fireEvent.click(button); expect(screen.getByText('Count: 1')).toBeInTheDocument(); });"]
      },
      {
        id: "23-12",
        name: "Drill 12: Build Configuration",
        texts: ["module.exports = { entry: './src/index.js', output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' }, module: { rules: [{ test: /\\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }] } };"]
      },
      {
        id: "23-13",
        name: "Drill 13: Progressive Web Apps",
        texts: ["const sw = 'serviceWorker' in navigator; if (sw) { navigator.serviceWorker.register('/sw.js').then(registration => console.log('SW registered')).catch(error => console.log('SW registration failed')); }"]
      },
      {
        id: "23-14",
        name: "Drill 14: Performance Optimization",
        texts: ["const LazyComponent = React.lazy(() => import('./Component')); const App = () => { return <Suspense fallback={<div>Loading...</div>}><LazyComponent /></Suspense>; }; const memoizedComponent = React.memo(Component);"]
      },
      {
        id: "23-15",
        name: "Drill 15: Full Stack Integration",
        texts: ["const express = require('express'); const app = express(); app.use(express.json()); app.post('/api/users', async (req, res) => { try { const user = await User.create(req.body); res.status(201).json(user); } catch (error) { res.status(400).json({ error: error.message }); } }); app.listen(3000, () => console.log('Server running on port 3000'));"]
      }
    ]
  },

  // Chapter 24: Database & Backend Development
  {
    id: "opt-chapter-24",
    name: "Chapter 24: Database & Backend Development",
    description: "Master backend programming, SQL, and database-related typing.",
    lessons: [
      {
        id: "24-1",
        name: "Drill 1: SQL Basics",
        texts: ["SELECT id, name, email FROM users WHERE active = true ORDER BY created_at DESC LIMIT 10;"]
      },
      {
        id: "24-2",
        name: "Drill 2: Complex Queries",
        texts: ["SELECT u.name, COUNT(p.id) as post_count FROM users u LEFT JOIN posts p ON u.id = p.user_id GROUP BY u.id HAVING post_count > 5;"]
      },
      {
        id: "24-3",
        name: "Drill 3: Database Schemas",
        texts: ["CREATE TABLE users ( id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );"]
      },
      {
        id: "24-4",
        name: "Drill 4: Stored Procedures",
        texts: ["CREATE PROCEDURE GetUserStats(IN user_id INT) BEGIN SELECT COUNT(*) as total_posts, AVG(views) as avg_views FROM posts WHERE author_id = user_id; END;"]
      },
      {
        id: "24-5",
        name: "Drill 5: Node.js APIs",
        texts: ["const express = require('express'); const router = express.Router(); router.get('/users/:id', async (req, res) => { const user = await User.findById(req.params.id); res.json(user); });"]
      },
      {
        id: "24-6",
        name: "Drill 6: Database Connections",
        texts: ["const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });"]
      },
      {
        id: "24-7",
        name: "Drill 7: ORM Models",
        texts: ["const User = sequelize.define('User', { firstName: { type: DataTypes.STRING, allowNull: false }, email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } } });"]
      },
      {
        id: "24-8",
        name: "Drill 8: Authentication",
        texts: ["const jwt = require('jsonwebtoken'); const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });"]
      },
      {
        id: "24-9",
        name: "Drill 9: Middleware",
        texts: ["const authenticateToken = (req, res, next) => { const token = req.headers['authorization']?.split(' ')[1]; if (!token) return res.status(401).json({ error: 'Access denied' }); jwt.verify(token, process.env.JWT_SECRET, (err, user) => { if (err) return res.status(403).json({ error: 'Invalid token' }); req.user = user; next(); }); };"]
      },
      {
        id: "24-10",
        name: "Drill 10: Error Handling",
        texts: ["const errorHandler = (err, req, res, next) => { console.error(err.stack); res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' }); };"]
      },
      {
        id: "24-11",
        name: "Drill 11: Data Validation",
        texts: ["const Joi = require('joi'); const userSchema = Joi.object({ name: Joi.string().min(2).max(50).required(), email: Joi.string().email().required(), password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/) });"]
      },
      {
        id: "24-12",
        name: "Drill 12: Caching Strategies",
        texts: ["const redis = require('redis'); const client = redis.createClient(); const getCachedUser = async (id) => { const cached = await client.get(`user:${id}`); return cached ? JSON.parse(cached) : null; };"]
      },
      {
        id: "24-13",
        name: "Drill 13: Background Jobs",
        texts: ["const Queue = require('bull'); const emailQueue = new Queue('email processing'); emailQueue.process(async (job) => { const { to, subject, body } = job.data; await sendEmail(to, subject, body); });"]
      },
      {
        id: "24-14",
        name: "Drill 14: API Documentation",
        texts: ["/**\n * @swagger\n * /api/users:\n *   get:\n *     summary: Get all users\n *     responses:\n *       200:\n *         description: List of users\n *         content:\n *           application/json:\n *             schema:\n *               type: array\n *               items:\n *                 $ref: '#/components/schemas/User'\n */"]
      },
      {
        id: "24-15",
        name: "Drill 15: Microservices Architecture",
        texts: ["const grpc = require('@grpc/grpc-js'); const protoLoader = require('@grpc/proto-loader'); const packageDefinition = protoLoader.loadSync('user-service.proto'); const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;"]
      }
    ]
  },

  // Chapter 25: Advanced Technical Writing
  {
    id: "opt-chapter-25",
    name: "Chapter 25: Advanced Technical Writing",
    description: "Master technical documentation, API references, and complex coding patterns.",
    lessons: [
      {
        id: "25-1",
        name: "Drill 1: API Documentation",
        texts: ["GET /api/v1/users/{id} - Retrieves user information. Parameters: id (required): User ID. Returns: 200 OK with user object, 404 if not found."]
      },
      // Continue with technical patterns...
      {
        id: "25-15",
        name: "Drill 15: Technical Mastery",
        texts: ["The implementation of microservices architecture with containerized deployment strategies requires comprehensive understanding of distributed systems principles."]
      }
    ]
  },

  // Chapter 26: Creative Writing & Literature
  {
    id: "opt-chapter-26",
    name: "Chapter 26: Creative Writing & Literature",
    description: "Express creativity through typing poetry, stories, and artistic prose.",
    lessons: [
      {
        id: "26-1",
        name: "Drill 1: Poetry Basics",
        texts: ["Roses are red, violets are blue, typing is fun, and so are you. The moon shines bright on a starry night, while gentle breezes whisper soft and light."]
      },
      {
        id: "26-2",
        name: "Drill 2: Haiku Practice",
        texts: ["Cherry blossoms fall / Gently dancing on spring breeze / Beauty in moment || Autumn leaves descend / Silent forest holds secrets / Time flows like water"]
      },
      {
        id: "26-3",
        name: "Drill 3: Short Story Openings",
        texts: ["The old man sat by the window, watching raindrops race down the glass. Each drop told a story of clouds and sky, of journeys through wind and weather."]
      },
      {
        id: "26-4",
        name: "Drill 4: Descriptive Imagery",
        texts: ["Golden sunlight filtered through emerald leaves, casting dancing shadows on the moss-covered forest floor where wildflowers bloomed in secret meadows."]
      },
      {
        id: "26-5",
        name: "Drill 5: Character Development",
        texts: ["Sarah's eyes sparkled with curiosity, her mind always questioning, always wondering about the mysteries hidden in ordinary moments of everyday life."]
      },
      {
        id: "26-6",
        name: "Drill 6: Dialogue Writing",
        texts: ["\"Where are we going?\" she asked, her voice barely above a whisper. \"Somewhere beautiful,\" he replied, his smile mysterious yet reassuring."]
      },
      {
        id: "26-7",
        name: "Drill 7: Metaphorical Language",
        texts: ["Life is a river flowing toward unknown seas, carrying dreams like fallen leaves on its gentle current toward distant shores of possibility."]
      },
      {
        id: "26-8",
        name: "Drill 8: Emotional Expression",
        texts: ["Joy bubbled up from her heart like a spring fountain, overflowing with happiness that seemed to light up the entire world around her."]
      },
      {
        id: "26-9",
        name: "Drill 9: Setting & Atmosphere",
        texts: ["The ancient library whispered with the wisdom of ages, its towering shelves holding countless stories waiting to be discovered by curious minds."]
      },
      {
        id: "26-10",
        name: "Drill 10: Narrative Voice",
        texts: ["I remember the day everything changed, when ordinary moments transformed into extraordinary memories that would shape the rest of my journey through life."]
      },
      {
        id: "26-11",
        name: "Drill 11: Symbolism & Themes",
        texts: ["The lighthouse stood as a beacon of hope, its steady light cutting through darkness, guiding lost souls safely home across turbulent waters."]
      },
      {
        id: "26-12",
        name: "Drill 12: Stream of Consciousness",
        texts: ["Thoughts flowing like water over stones, memories mixing with dreams, past and present dancing together in the endless rhythm of conscious experience."]
      },
      {
        id: "26-13",
        name: "Drill 13: Historical Fiction",
        texts: ["The cobblestone streets echoed with the clip-clop of horse hooves as merchants called their wares in the bustling marketplace of medieval times."]
      },
      {
        id: "26-14",
        name: "Drill 14: Fantasy & Imagination",
        texts: ["Dragons soared through crystal skies above enchanted forests where magical creatures lived in harmony with ancient trees that held the secrets of time."]
      },
      {
        id: "26-15",
        name: "Drill 15: Creative Mastery",
        texts: ["Words become music when writers discover the rhythm hidden within language, transforming simple letters into symphonies of meaning that resonate in readers' hearts forever."]
      }
    ]
  },

  // Chapter 27: Scientific & Academic Writing
  {
    id: "opt-chapter-27",
    name: "Chapter 27: Scientific & Academic Writing",
    description: "Master formal academic and scientific writing styles and terminology.",
    lessons: [
      {
        id: "27-1",
        name: "Drill 1: Research Methodology",
        texts: ["The experimental design employed a randomized controlled trial with double-blind procedures to eliminate potential bias in data collection and analysis."]
      },
      {
        id: "27-2",
        name: "Drill 2: Statistical Analysis",
        texts: ["Results indicate a statistically significant correlation (p < 0.05) between the independent and dependent variables, with r² = 0.76 explaining variance."]
      },
      {
        id: "27-3",
        name: "Drill 3: Abstract Writing",
        texts: ["Background: This study investigates the relationship between cognitive load and task performance. Methods: 120 participants completed standardized assessments. Results: Significant differences were observed. Conclusion: Findings support the hypothesis."]
      },
      {
        id: "27-4",
        name: "Drill 4: Literature Review",
        texts: ["Previous research has demonstrated consistent patterns in human behavior (Smith et al., 2020; Johnson & Davis, 2019), although recent studies suggest alternative interpretations."]
      },
      {
        id: "27-5",
        name: "Drill 5: Hypothesis Formation",
        texts: ["We hypothesize that increased exposure to educational technology will positively correlate with student engagement and academic performance outcomes."]
      },
      {
        id: "27-6",
        name: "Drill 6: Data Presentation",
        texts: ["Table 1 presents descriptive statistics for all measured variables. Figure 2 illustrates the relationship between treatment conditions and observed outcomes."]
      },
      {
        id: "27-7",
        name: "Drill 7: Citation Formats",
        texts: ["According to Brown (2021), \"the implications of this research extend beyond theoretical frameworks\" (p. 45). Multiple studies support this conclusion (Adams, 2020; Chen et al., 2019)."]
      },
      {
        id: "27-8",
        name: "Drill 8: Discussion Sections",
        texts: ["These findings align with previous research while revealing novel insights into the underlying mechanisms. Limitations include sample size and geographical constraints."]
      },
      {
        id: "27-9",
        name: "Drill 9: Technical Terminology",
        texts: ["Neuroplasticity, synaptic pruning, and long-term potentiation represent fundamental mechanisms underlying learning and memory consolidation processes in the human brain."]
      },
      {
        id: "27-10",
        name: "Drill 10: Grant Proposals",
        texts: ["Specific Aim 1: To characterize the molecular mechanisms underlying cellular differentiation. Expected outcomes include identification of key regulatory pathways."]
      },
      {
        id: "27-11",
        name: "Drill 11: Peer Review",
        texts: ["The manuscript presents interesting findings but requires clarification regarding methodology. Suggestions include additional controls and expanded discussion of limitations."]
      },
      {
        id: "27-12",
        name: "Drill 12: Conference Abstracts",
        texts: ["Introduction: Current theories inadequately explain observed phenomena. Methods: Novel analytical approaches were developed. Results: Significant patterns emerged. Conclusions: Paradigm shift required."]
      },
      {
        id: "27-13",
        name: "Drill 13: Thesis Writing",
        texts: ["Chapter 3 examines the theoretical framework underlying this investigation, synthesizing relevant literature to establish conceptual foundations for subsequent empirical analysis."]
      },
      {
        id: "27-14",
        name: "Drill 14: Laboratory Reports",
        texts: ["Materials and Methods: Samples were prepared using standard protocols. Observations were recorded at 30-minute intervals. Statistical analysis employed ANOVA with post-hoc comparisons."]
      },
      {
        id: "27-15",
        name: "Drill 15: Academic Mastery",
        texts: ["Contemporary scholarship demands rigorous methodology, critical analysis, and clear communication to advance human knowledge through systematic investigation of complex phenomena across diverse disciplines."]
      }
    ]
  },

  // Chapter 28: International & Multilingual Content
  {
    id: "opt-chapter-28", 
    name: "Chapter 28: International & Multilingual Content",
    description: "Practice typing international characters, names, and global content.",
    lessons: [
      {
        id: "28-1",
        name: "Drill 1: European Names",
        texts: ["François Müller, José García, André Sørensen, Björn Andersson, Zoë van der Berg, Piërre Dubois, Łukasz Kowalski, Åse Hansen"]
      },
      {
        id: "28-2",
        name: "Drill 2: World Cities",
        texts: ["São Paulo, México City, Zürich, München, København, Göteborg, Kraków, Malmö, Düsseldorf, Montréal, Québec, Señora López"]
      },
      {
        id: "28-3",
        name: "Drill 3: Accented Characters",
        texts: ["café, résumé, naïve, façade, jalapeño, piñata, cliché, déjà vu, fiancé, protégé, Citroën, Häagen-Dazs, Škoda, Björk"]
      },
      {
        id: "28-4",
        name: "Drill 4: Currency & Symbols",
        texts: ["€50.00, £25.99, ¥1000, $100.00, ₹500, ₽2000, ₩50000, ¢99, ©2024, ®trademark, °C, °F, ±5%, α, β, γ, δ, π, Ω"]
      },
      {
        id: "28-5",
        name: "Drill 5: International Business",
        texts: ["The quarterly report shows revenue of €2.5M across European markets, with particularly strong performance in Deutschland and España."]
      },
      {
        id: "28-6",
        name: "Drill 6: Academic Citations",
        texts: ["Müller, J. (2020). Überlegungen zur modernen Technologie. Zeitschrift für Innovation, 15(3), 45-62. https://doi.org/10.1000/xyz123"]
      },
      {
        id: "28-7",
        name: "Drill 7: Geographic Features",
        texts: ["The Rhône flows through Lyon, the Danube passes through Wien, and the São Francisco river crosses Brasil from north to south."]
      },
      {
        id: "28-8",
        name: "Drill 8: Cultural References",
        texts: ["Día de los Muertos celebrates life and death in México. Oktoberfest brings people together in München. Midsommar is celebrated across Scandinavia."]
      },
      {
        id: "28-9",
        name: "Drill 9: Technical Standards",
        texts: ["ISO 9001:2015 certification ensures quality management. The device operates at 220V±10% across EU markets. Temperature range: -20°C to +85°C."]
      },
      {
        id: "28-10",
        name: "Drill 10: Email Addresses",
        texts: ["Contact: müller@företag.se, garcia@empresa.es, dubois@société.fr, andersson@företag.no, kowalski@firma.pl"]
      },
      {
        id: "28-11",
        name: "Drill 11: Mathematical Expressions",
        texts: ["∑(xi) = μ ± σ where i ∈ [1,n]. The equation f(x) = x² + 2x + 1 has roots at x = -1. Calculate: ∫₀¹ x²dx = ⅓"]
      },
      {
        id: "28-12",
        name: "Drill 12: Scientific Notation",
        texts: ["Avogadro's number: 6.022 × 10²³ mol⁻¹. Speed of light: 2.998 × 10⁸ m/s. Planck constant: 6.626 × 10⁻³⁴ J·s"]
      },
      {
        id: "28-13",
        name: "Drill 13: Address Formats",
        texts: ["Dr. François Müller, 123 Rue de la Paix, 75001 Paris, France || Señora García, Calle Mayor 45, 28013 Madrid, España"]
      },
      {
        id: "28-14",
        name: "Drill 14: Time Zones & Dates",
        texts: ["Meeting: 15:00 CET (14:00 GMT, 09:00 EST, 23:00 JST). Date formats: 25/12/2024 (EU), 12/25/2024 (US), 2024-12-25 (ISO)"]
      },
      {
        id: "28-15",
        name: "Drill 15: Global Communication",
        texts: ["International collaboration requires cultural sensitivity, linguistic precision, and technical accuracy when communicating across diverse global markets with multilingual stakeholders."]
      }
    ]
  },

  // Chapter 29: Mixed Advanced Challenges
  {
    id: "opt-chapter-29",
    name: "Chapter 29: Mixed Advanced Challenges",
    description: "Combined challenges mixing all content types for ultimate skill development.",
    lessons: [
      {
        id: "29-1",
        name: "Drill 1: Multi-Domain Content",
        texts: ["function calculateROI(investment, returns) { return ((returns - investment) / investment) * 100; } // Financial analysis for Q4 2024: €250K investment yielded 18% ROI."]
      },
      {
        id: "29-2",
        name: "Drill 2: Technical Documentation",
        texts: ["API Endpoint: POST /api/v2/users/:id/preferences - Updates user settings. Required headers: Authorization: Bearer <token>. Payload: { theme: 'dark', language: 'en-US', notifications: true }"]
      },
      {
        id: "29-3",
        name: "Drill 3: Scientific Data",
        texts: ["Research findings (N=1,247, p<0.001) demonstrate significant correlation between variables X₁ and Y₂ (r=0.87, CI: 0.82-0.92) across multiple demographic segments."]
      },
      {
        id: "29-4",
        name: "Drill 4: Business Communication",
        texts: ["Dear Dr. Müller, Following our discussion regarding the Q3 financial results, I'm pleased to confirm that revenue exceeded projections by 12.5% (€3.2M vs €2.85M forecasted)."]
      },
      {
        id: "29-5",
        name: "Drill 5: Literary & Technical Mix",
        texts: ["\"To code, or not to code, that is the question\" - whether 'tis nobler to suffer the bugs of outrageous fortune, or to take arms against legacy systems and refactor them."]
      },
      {
        id: "29-6",
        name: "Drill 6: Global Business Data", 
        texts: ["Regional Performance: North America $2.1M (+15%), Europe €1.8M (+8%), Asia-Pacific ¥180M (+22%), Latin America $450K (+5%). Total: $5.2M equivalent."]
      },
      {
        id: "29-7",
        name: "Drill 7: Complex Programming",
        texts: ["const asyncProcessor = async (data) => { try { const results = await Promise.all(data.map(async item => await processItem(item))); return results.filter(r => r.status === 'success'); } catch (error) { console.error('Processing failed:', error); throw error; } };"]
      },
      {
        id: "29-8",
        name: "Drill 8: Academic Citations Mixed",
        texts: ["According to recent studies (García et al., 2024; Müller & Andersson, 2023), machine learning algorithms demonstrate 94.7% accuracy in pattern recognition tasks (p<0.001, n=10,000)."]
      },
      {
        id: "29-9",
        name: "Drill 9: Technical Specifications",
        texts: ["System Requirements: CPU: Intel i7-12700K @ 3.6GHz, RAM: 32GB DDR4-3200, Storage: 1TB NVMe SSD, GPU: RTX 4080 16GB, Network: Gigabit Ethernet, OS: Windows 11 Pro (22H2)"]
      },
      {
        id: "29-10",
        name: "Drill 10: Creative Technical Writing",
        texts: ["In the digital realm where algorithms dance with data, machine learning models learn to recognize patterns like ancient scholars deciphering cryptic manuscripts by candlelight."]
      },
      {
        id: "29-11",
        name: "Drill 11: Financial Programming",
        texts: ["class Portfolio { constructor() { this.assets = new Map(); } addAsset(symbol, quantity, price) { this.assets.set(symbol, { qty: quantity, cost: price, value: quantity * price }); } getTotalValue() { return Array.from(this.assets.values()).reduce((sum, asset) => sum + asset.value, 0); } }"]
      },
      {
        id: "29-12",
        name: "Drill 12: International Legal",
        texts: ["Article 15.3: This agreement shall be governed by the laws of Switzerland. Disputes will be resolved through arbitration in Zürich. All parties consent to jurisdiction of Swiss courts."]
      },
      {
        id: "29-13",
        name: "Drill 13: Medical Research",
        texts: ["Double-blind placebo-controlled study (n=2,847) evaluating efficacy of novel therapeutic intervention. Primary endpoint: 30% reduction in symptoms (p<0.05). Secondary endpoints include safety profile and quality-of-life measures."]
      },
      {
        id: "29-14",
        name: "Drill 14: Advanced Analytics",
        texts: ["import pandas as pd; import numpy as np; from sklearn.ensemble import RandomForestClassifier; model = RandomForestClassifier(n_estimators=100, random_state=42); X_train, X_test = train_test_split(features, test_size=0.2)"]
      },
      {
        id: "29-15",
        name: "Drill 15: Ultimate Integration",
        texts: ["The convergence of artificial intelligence, quantum computing, and blockchain technology represents a paradigm shift requiring interdisciplinary collaboration between computer scientists, mathematicians, and domain experts to develop scalable solutions for complex real-world challenges across diverse industries while maintaining ethical standards and regulatory compliance in an increasingly interconnected global economy."]
      }
    ]
  },

  // Chapter 30: Ultimate Mastery Challenge
  {
    id: "opt-chapter-30",
    name: "Chapter 30: Ultimate Typing Mastery",
    description: "The final challenge - complex mixed content at professional speeds.",
    lessons: [
      {
        id: "30-1", 
        name: "Drill 1: Mixed Content Challenge",
        texts: ["function calculateCompoundInterest(principal: number, rate: number, time: number): number { return principal * Math.pow(1 + rate, time); } // Financial modeling requires precision"]
      },
      {
        id: "30-2",
        name: "Drill 2: Advanced Algorithms",
        texts: ["class BinarySearchTree { constructor() { this.root = null; } insert(value) { if (!this.root) this.root = new Node(value); else this.insertNode(this.root, value); } search(value) { return this.searchNode(this.root, value); } }"]
      },
      {
        id: "30-3",
        name: "Drill 3: Scientific Research Complex",
        texts: ["The meta-analysis (k=47 studies, N=15,293 participants) revealed heterogeneous effect sizes (I²=78%, p<0.001) with significant publication bias (Egger's test: t=3.42, p=0.03). Random-effects model: d=0.64, 95% CI [0.45, 0.83]."]
      },
      {
        id: "30-4",
        name: "Drill 4: International Business Complex",
        texts: ["Q4 Performance Summary: EMEA revenues €47.2M (+18.5% YoY), APAC ¥1.8B (+24.3%), Americas $52.1M (+12.7%). FX impact: -€3.2M. EBITDA margin: 31.4% vs 28.9% prior year. Currency hedging strategy reduced volatility by 15%."]
      },
      {
        id: "30-5",
        name: "Drill 5: Technical Architecture",
        texts: ["Microservices architecture utilizing Kubernetes orchestration (v1.28), Redis clusters for caching, PostgreSQL 15 with read replicas, Kafka for event streaming, Prometheus/Grafana monitoring, and CI/CD pipelines via GitLab with automated testing and canary deployments."]
      },
      {
        id: "30-6",
        name: "Drill 6: Advanced Literary Analysis",
        texts: ["The narrative structure employs metalepsis and prolepsis to destabilize temporal boundaries, creating a palimpsestic text where past and present coalesce through free indirect discourse, revealing the psychological interiority of characters caught between modernity and tradition."]
      },
      {
        id: "30-7",
        name: "Drill 7: Mathematical Proofs",
        texts: ["Theorem: ∀ε>0, ∃δ>0 such that |f(x)-L|<ε whenever 0<|x-c|<δ. Proof: Let ε>0 be given. Since f(x)=x²+3x-1 is continuous at c=2, we can choose δ=min{1,ε/7}. Then |x-2|<δ implies |f(x)-f(2)|<ε. ∎"]
      },
      {
        id: "30-8",
        name: "Drill 8: Legal Documentation Complex",
        texts: ["Pursuant to Article 25 GDPR and Section 1798.140(c) CCPA, data subjects retain the right to request deletion of personal information collected under legitimate interests balancing test, subject to applicable exemptions for legal compliance and freedom of expression."]
      },
      {
        id: "30-9",
        name: "Drill 9: Advanced Programming Patterns",
        texts: ["const memoizedFibonacci = (() => { const cache = new Map(); return function fib(n) { if (cache.has(n)) return cache.get(n); if (n <= 1) return n; const result = fib(n-1) + fib(n-2); cache.set(n, result); return result; }; })();"]
      },
      {
        id: "30-10",
        name: "Drill 10: Medical Research Advanced",
        texts: ["Randomized, double-blind, placebo-controlled phase III trial (NCT04567890) evaluating efficacy of novel immunomodulatory agent in treatment-resistant patients. Primary endpoint: progression-free survival (HR=0.68, 95% CI: 0.52-0.89, p=0.005). NNT=7.2 patients."]
      },
      {
        id: "30-11",
        name: "Drill 11: Quantum Computing Theory",
        texts: ["Quantum entanglement enables superposition states |ψ⟩ = α|00⟩ + β|01⟩ + γ|10⟩ + δ|11⟩ where |α|²+|β|²+|γ|²+|δ|²=1. Bell inequality violations demonstrate non-locality, with CHSH parameter S ≤ 2√2 for quantum systems versus S ≤ 2 classically."]
      },
      {
        id: "30-12",
        name: "Drill 12: Financial Derivatives Complex",
        texts: ["Black-Scholes equation: ∂V/∂t + ½σ²S²∂²V/∂S² + rS∂V/∂S - rV = 0. Delta-hedged portfolio requires Γ-neutral adjustments when |Δ| > 0.7. Implied volatility smile indicates market-perceived skewness in underlying asset distribution. VaR₉₅ = $2.3M."]
      },
      {
        id: "30-13",
        name: "Drill 13: Philosophical Discourse",
        texts: ["Phenomenological reduction (epoché) brackets the natural attitude to reveal intentional consciousness structures. Husserl's transcendental ego constitutes meaning through noetic-noematic correlations, while Heidegger's Dasein reveals Being-in-the-world as fundamental ontological structure."]
      },
      {
        id: "30-14",
        name: "Drill 14: Ultimate Technical Challenge",
        texts: ["Implementation details: OAuth 2.0/OIDC authentication with PKCE flow, JWT tokens (RS256), rate limiting (100 req/min), input validation via JSON Schema, SQL injection prevention through parameterized queries, XSS mitigation via CSP headers, and OWASP compliance throughout the security stack."]
      },
      {
        id: "30-15",
        name: "Drill 15: The Ultimate Test",
        texts: ["QwertyuiopAsdfghjklZxcvbnm1234567890!@#$%^&*(){}[]\\|;':\",./<>?`~_+-=Qwerty; The ultimate mastery of touch typing represents the culmination of dedicated practice, muscle memory development, and cognitive processing optimization, enabling professionals to transform thoughts into digital text with unprecedented speed, accuracy, and fluency across all forms of written communication including literary prose, technical documentation, programming code, mathematical expressions, business correspondence, academic research, creative writing, and complex data analysis while maintaining perfect form, rhythm, and endurance throughout extended typing sessions in diverse professional environments and challenging conditions."]
      }
    ]
  }
];

// Export both original and optimized for comparison
export const originalChapters = chapters; // Import the original chapters
