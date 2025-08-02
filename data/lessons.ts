import type { Chapter } from '../types';

export const chapters: Chapter[] = [
  {
    id: "chapter-0",
    name: "Chapter 0: The Starting Line",
    description: "Welcome to TypingPath! Let's get your hands in the right position.",
    lessons: [
      {
        id: "0-1",
        name: "Keyboard Positioning Guide",
        type: 'guide',
        texts: ["This is a visual guide. Click the button below to start your first lesson."]
      }
    ]
  },
  {
    id: "chapter-1",
    name: "Chapter 1: The Home Row",
    description: "Master the foundation of touch typing. Keep your fingers on 'asdf' and 'jkl;'.",
    lessons: [
      { id: "1-1", name: "Keys: f j", texts: [
        "f j fj jf ff jj f j fj jf", "j f jf fj jj ff j f jf fj", "fj fj fj jf jf jf f j",
        "ff jj ff jj f f j j fj jf", "f j f j f j j f j f j f", "fjf jfj jfjf j j f f",
        "fJ jF fJ jF Fj fJ jF Fj", "J f F j Jf Fj fF jJ", "f j f j f j f j f j f j", "j f j f j f j f j f j f",
        "f j f j f j f j f j", "j f j f j f j f j f", "fj fj jf jf ff jj", "jf jf fj fj jj ff", "f f f j j j fj jf fj jf"
      ] },
      { id: "1-2", name: "Keys: d k", texts: [
        "d k dk kd dd kk d k dk kd", "k d kd dk kk dd k d kd dk", "dk dk dk kd kd kd d k",
        "dd kk dd kk d d k k dk kd", "d k d k d k k d k d k d", "dkd kdk dkdk k k d d",
        "fjdksl fjdksl ask sad lad", "add fall asks all; sad lad", "dkf jfk dkf jfk d k f j", "kdd jff kdd jff j k d f",
        "fad jad dad sad fad jad dad", "ask ask fad fad jak jak", "add add dad dad fads lads", "fad sad lad jak ask dak", "dad add jak ask sad lad fad"
      ] },
      { id: "1-3", name: "Keys: s l", texts: [
        "s l sl ls ss ll s l sl ls", "l s ls sl ll ss l s ls sl", "sl sl sl ls ls ls s l",
        "ss ll ss ll s s l l sl ls", "s l s l s l l s l s l s", "sls lsl slsl l l s s",
        "a sad lad; a fall; all ask", "a lass; a flask; lads fall", "ask a sad lass; all fall", "Sal Lad asks a sad lass.",
        "falls salads flasks asks lads", "a lass asks a sad lad", "all sad lads fall; a flask", "she sells sea shells", "ask a sad lass; all fall"
      ] },
      { id: "1-4", name: "Keys: a ;", texts: [
        "a ; a; ;a aa ;; a ; a; ;a", "; a ;a a; ;; aa ; a ;a a;", "a; a; a; ;a ;a ;a a ;",
        "aa ;; aa ;; a a ; ; a; ;a", "a ; a ; a ; ; a ; a ; a", "a;a ;a; a;a; ; ; a a",
        "ask a lad; a sad lass;", "all fall; a sad flask;", "a salad; a lass;", "a lass asks; a lad adds;",
        "a sad fall; a lad asks;", "a flask; all salads; add a", "ask a lass; a fall salad", "a lad adds; a sad flask", "a sad lass; a fall; ask all"
      ] },
      { id: "1-5", name: "Keys: g h", texts: [
        "g h gh hg gg hh g h gh hg", "h g hg gh hh gg h g hg gh", "gh gh gh hg hg hg g h",
        "gg hh gg hh g g h h gh hg", "g h g h g h h g h g h g", "ghg hgh ghgh h h g g",
        "hash glad shag flag gag", "a flash; a high gag; gas", "a shad; a lash; a ghast", "has lag shag dash; flags",
        "gag shag flag glad hash", "high gas; a shag rug; flag", "a glad lad; a high flash", "dash a flag; shag gas; hag", "a ghast has a glad gag"
      ] },
      { id: "1-6", name: "Home Row Words", texts: [
        "a lad asks a sad lass; a fall", "a flask; all lads; add a gash", "glad half; gas flag; shag a lad",
        "ask all; a sad lass falls", "all ask; a lad; a sad fall", "had gas; a flag; a sad lass",
        "flash; all lads ask; a fall;", "a lass had a flask of gas;", "He asks a sad lad; she falls;",
        "A Lass; A Lad; A Glad Flash;", "shall shag; a glad flash; gas", "ask a lass; a sad fall; a flask",
        "a lad had a gas flash; all fall", "a sad lass asks all lads", "he had a flash; she has gas"
      ] },
    ],
  },
  {
    id: "chapter-2",
    name: "Chapter 2: Top Row - E I R U",
    description: "Let's reach up! Introduce the top row keys, starting with the most common ones.",
    lessons: [
      { id: "2-1", name: "Keys: e i", texts: [
        "e i ei ie ee ii e i ei ie", "i e ie ei ii ee i e ie ei", "is if in; lie life; see a",
        "she said; he is; it is;", "feel life; see flies; like", "I see; he lies; she is ill;",
        "The life; A fee; See the kid", "He lies; I feel ill; she is", "a high fee; a sad life; I see",
        "He did see the flies; it is", "I feel like she is ill;", "life is like a fee;", "did he see the flies;",
        "if she is; it is a lie;", "a life like this; I feel"
      ] },
      { id: "2-2", name: "Keys: r u", texts: [
        "r u ru ur rr uu r u ru ur", "u r ur ru uu rr u r ur ru", "true; sure; fur; her; are",
        "run; use; her; far; a fur", "a true fur; her sad life;", "are you sure; use a rule;",
        "Her fur; Are you sure he is;", "I use a ruler; a true fury", "a rare fur; a rural route",
        "your ruler; her true fur", "are you sure about the fur", "run far; a true ruler; use",
        "her fur is rare and true", "a rural furrier; are you", "use your ruler for a fur"
      ] },
      { id: "2-3", name: "Words: e i r u", texts: [
        "her true fur; a rare user", "I desire a true fire; rule", "rise further; use a ruler",
        "a future risk; she is sure", "he lies; I feel ill; she is", "Her fur; Are you sure he is;",
        "I use a ruler; a true fury", "a rare fur; a rural route", "your ruler; her true fur",
        "the user is sure of the fire", "a future risk requires a rule", "I desire her rare fur rug",
        "is the user sure of her rule?", "rise further; use a future rule", "a true fire is a risk"
      ] },
    ]
  },
  {
    id: "chapter-3",
    name: "Chapter 3: Top Row - T Y W O",
    description: "Continue expanding your reach on the top row.",
    lessons: [
        { id: "3-1", name: "Keys: t y", texts: [
          "t y ty yt tt yy t y ty yt", "y t yt ty yy tt y t yt ty", "that; they; try; type; the",
          "a type; the truth; try that", "they try to type the truth;", "that type is a tad stuffy;",
          "a shy turtle; the dusty sky", "a tasty tart; the salty sea", "That dusty turtle is shy;",
          "They try to type that stuff.", "try to type a tasty tart", "the turtle is truly shy",
          "they say the sky is dusty", "that type of tart is tasty", "you try to type the truth"
        ] },
        { id: "3-2", name: "Keys: w o", texts: [
          "w o wo ow ww oo w o wo ow", "o w ow wo oo ww o w ow wo", "who; how; now; two; low; own",
          "a low row; two slow cows", "how to row; a brown owl", "we own two towns; who knows",
          "a yellow flower; a slow rowboat", "we now know how to work", "two wolves; a low wall",
          "wow now; how slow; own two", "who knows how to row now", "a slow brown owl in the woods",
          "we own two yellow flowers", "how low can the two wolves go", "wow now we own two towns"
        ] },
        { id: "3-3", name: "Words: t y w o", texts: [
          "two yellow toys; you write", "try to own your own work", "your town; they wrote; two",
          "we owe you; two types of wood", "the story you wrote was witty", "why try to own two toys",
          "you wrote two yellow words", "your own two; why they try", "they wrote to you; your toy",
          "how you try; who wrote that", "why own two yellow toys", "you wrote that witty story",
          "try to work on your own", "they own two types of wood", "who wrote to you about that"
        ] },
    ]
  },
  {
    id: "chapter-4",
    name: "Chapter 4: Top Row - Q P & Full Row",
    description: "Complete the top row and practice all the keys together.",
    lessons: [
        { id: "4-1", name: "Keys: q p", texts: [
          "q p qp pq qq pp q p qp pq", "p q pq qp pp qq p q pq qp", "quip; quiet; quote; part; pull",
          "a quiet park; a quick stop", "post a quote; a happy puppy", "a proper part; a quick quip",
          "a pair of purple puppies", "the quiet queen poured punch", "a polo player; a cheap copy",
          "a power nap; a quiet protest", "a quiet quip; a proper part", "the queen's polo puppy",
          "post a quick power quote", "a pair of quiet puppies", "a proper protest in the park"
        ] },
        { id: "4-2", name: "Top Row Words", texts: [
          "power query; we try to rope", "the quiet riot; a prior art", "I write poetry; you are there",
          "what other type of queries", "your posture is quite proper", "we require proper attire",
          "the territory is quite queer", "retry the entire query later", "a pretty top; we hope you quit",
          "type out the powerpoint quote", "the prior art requires proper poetry", "retry the quiet power query",
          "your attire is quite pretty", "we hope you quit the territory", "what other type of poetry"
        ] },
        { id: "4-3", name: "Home & Top Row", texts: [
          "the sad truth is that they lie", "she sells sea shells at the", "he is a guest; i see the risk",
          "a fire; a fresh fish; a flag", "a future trial; a great idea", "she is right; he has the flu",
          "a tall tree; a green leaf", "the first three; a free state", "they are here; where are you",
          "ask her later; she is tired", "where are the fresh fish?", "a great green leaf fell",
          "he has the right to a trial", "ask her where the tall tree is", "I see a sad state of affairs"
        ] },
    ]
  },
  {
    id: "chapter-5",
    name: "Chapter 5: Bottom Row - N M V C",
    description: "Time to reach down. Introduce the bottom row keys.",
    lessons: [
      { id: "5-1", name: "Keys: n m", texts: [
        "n m nm mn nn mm n m nm mn", "m n mn nm mm nn m n mn nm", "man; men; mean; name; and",
        "an ant; a man; an mean man", "many men mean many things;", "a main menu; a common name",
        "a mundane mansion; my name", "No man is an island, entire", "The moon, a silver coin",
        "many a man; the main menu", "a common name for a man", "the main moon; a mean mansion",
        "my name is not on the menu", "many men mean many things", "a common mundane name"
      ] },
      { id: "5-2", name: "Keys: v c", texts: [
        "v c vc cv vv cc v c vc cv", "c v cv vc cc vv c v cv vc", "cave; voice; civic; advice",
        "a very nice cave; a civic", "a clever voice; a caveman", "I can have a voice in this.",
        "A civic center; a clean van", "The vacant cave echoes.", "a festive event; a vivid view",
        "we can visit the civic center", "a civic voice; a very clever cave", "my advice is to visit the cave",
        "a clean van in the civic center", "a vacant, vivid cave", "I can voice my concerns"
      ] },
      { id: "5-3", name: "Words: n m v c", texts: [
        "a civic center in the city", "a brave man; a new cave", "my brave new vision; civic",
        "a common vision; a calm man", "a man can have a voice; can", "the cat came back the very",
        "a vacant cave; my conviction", "many men came to the cave", "come visit the new cave",
        "a common man; a civic meeting", "my conviction is that many men can", "come visit the vacant civic cave",
        "a brave man has a calm voice", "a new vision for the civic center", "a common conviction among men"
      ] },
    ]
  },
  {
    id: "chapter-6",
    name: "Chapter 6: Bottom Row - X Z B & Punctuation",
    description: "Finish the alphabet and add essential punctuation.",
    lessons: [
        { id: "6-1", name: "Keys: x z", texts: [
          "x z xz zx xx zz x z xz zx", "z x zx xz zz xx z x zx xz", "zoo; zip; zap; lazy; zone",
          "fix; box; mix; six; tax", "a lazy zebra in the zoo", "a fuzzy fox in a box",
          "the prize is a bronze box", "a dozen hazy, lazy afternoons", "the extra zip makes it amazing",
          "a complex puzzle; a fixed size", "the lazy fox; a fuzzy zebra", "fix the zip on the bronze box",
          "a complex tax puzzle prize", "six lazy hazy summer afternoons", "the zoo zone is amazing"
        ] },
        { id: "6-2", name: "Keys: b ,", texts: [
          "b , b, ,b bb ,, b , b, ,b", ", b ,b b, ,, bb , b ,b b,", "big, brown, bear, cub, but",
          "a big, bad boy, but a good", "bring a big, blue, book", "a bat, a ball, and a glove,",
          "the vibrant, beautiful butterfly", "a bubbly, blue beverage, maybe", "about a big, black, bug",
          "remember, be brave, be bold", "a big, bold, beautiful, blue butterfly", "bring a book, but not a big one",
          "a bat, a ball, a glove, and a base", "be brave, be bold, be bubbly", "about a bug, a bear, and a bat"
        ] },
        { id: "6-3", name: "Keys: . / ?", texts: [
          ". / . / . / ? ? / .", "/ . / . / . ? ? / .", "end. finish. stop. period.",
          "what? how? when? where? why?", "C:/Users/Default/My.Documents/", "a/b/c.txt?query=search",
          "Is this the end? I think so.", "The path is a/b/c or a/b/d.", "Where is my file? It is at C:/.",
          "The file is file.txt. See?", "Can you find it? What/Where is it?", "Yes. No. Maybe? I don't know.",
          "What is the path? C:/a/b/c.txt.", "Is the query over? Yes. The end.", "Where/when/how do I stop?",
          "The file is at a/b/c.txt. Ok."
        ] },
        { id: "6-4", name: "All Rows Mix", texts: [
          "the quick brown fox jumps over the lazy dog.", "pack my box with five dozen liquor jugs.",
          "a very amazing job of packing the box!", "how quickly daft jumping zebras vex.",
          "the five boxing wizards jump quickly.", "a wizard's job is to vex chumps.",
          "My new keyboard is very quiet and nice.", "The hazy fog covered the valley.",
          "Never underestimate the power of a good nap.", "A journey of a thousand miles begins.",
          "Quickly, the lazy brown fox jumped.", "Five or six big wizards quietly vexed the chump.",
          "Pack my box with a dozen jugs of liquor.", "Is that a quick brown fox jumping over the dog?",
          "How many wizards does it take to vex a chump?"
        ] },
    ]
  },
  {
    id: "chapter-7",
    name: "Chapter 7: Capitalization & Shift",
    description: "Learn to use the Shift key for capital letters and common punctuation.",
    lessons: [
        { id: "7-1", name: "Capital Letters", texts: [
          "My name is Alex. He is from Spain.", "The quick Brown Fox. A Lazy Dog.", "Paris is the capital of France.",
          "John, Mary, Peter, and Susan.", "I love New York City in the Spring.", "The United States of America.",
          "Monday, Tuesday, Wednesday, Friday.", "She read 'The Great Gatsby'.", "My favorite movie is Star Wars.",
          "Can you speak English? Yes, I can.", "The Queen of England lives in London.", "I met Bob from accounting.",
          "The Eiffel Tower is in Paris, France.", "My birthday is in August.", "Let's visit Central Park in New York."
        ] },
        { id: "7-2", name: "Punctuation (! ? \" ')", texts: [
          "Wow! That's amazing! I can't believe it.", "What is your name? Is it John?", "She said, \"Hello, world!\" and smiled.",
          "It's a beautiful day, isn't it?", "\"Stop!\" he shouted. \"Don't move!\"", "Where are you going? Can I come?",
          "I'm not sure... What do you think?", "This is Tom's car. It's blue.", "\"What a great idea!\" she exclaimed.",
          "He asked, \"Are you sure about this?\"", "This isn't right! Is it?", "\"Hurry up!\" she urged. \"We'll be late!\"",
          "Is this yours or mine? It's not John's.", "I can't do it! It's too hard!", "\"Can we go now?\" they asked."
        ] },
        { id: "7-3", name: "Full Sentences", texts: [
          "The train leaves at 3:00 PM. Don't be late!", "Mary's favorite book is 'Pride and Prejudice'.",
          "\"Where did you put the keys?\" he asked.", "I visited London, Paris, and Rome last summer.",
          "What time does the movie start? Is it at 7 or 8?", "Oh, no! I think I forgot to lock the door.",
          "John Smith lives at 123 Main St., Anytown.", "She exclaimed, \"I finally finished my project!\"",
          "Is Mount Everest the tallest mountain? Yes, it is.", "He thought, 'This is harder than it looks.'",
          "The CEO, Mr. Smith, will arrive at 9:00 AM.", "Her response was quick: \"Absolutely not!\"",
          "I'm going to the store; do you need anything?", "This is crazy! Are you seeing this?", "The file's name is 'final_report.docx'."
        ] },
    ]
  },
  {
    id: "chapter-8",
    name: "Chapter 8: The Number Row",
    description: "Practice typing numbers without looking down at the keyboard.",
    lessons: [
      { id: "8-1", name: "Numbers 1-5", texts: [
        "1 2 3 4 5 12 34 51 23 45", "11 22 33 44 55 123 451 234", "call 123-4512 for 34 seats",
        "5 ships, 4 planes, 3 cars, 2 bikes, 1 boat", "order 54321, invoice 12345", "add 1, 2, 3, 4, and 5",
        "she has 2 cats and 3 dogs", "the code is 15243", "there are 4 seasons and 12 months",
        "room 345, building 12", "1 and 2 and 3 and 4 and 5", "the number 54321 is not 12345",
        "I have 3 brothers and 4 sisters", "The test has 5 parts and 25 questions.", "She is 4 feet 11 inches tall."
      ] },
      { id: "8-2", name: "Numbers 6-0", texts: [
        "6 7 8 9 0 67 89 06 78 90", "66 77 88 99 00 678 906 789", "phone 890-6789, extension 0",
        "9 chairs, 8 tables, 7 lamps, 6 plants", "the year 1987 or 2006 or 2020", "zip code 90210 or 08867",
        "he is 6 feet 0 inches tall", "there were 789 people there", "call at 9:00 or 8:00 or 7:00",
        "the number is 687 901 00", "He was born in 1990, not 1996.", "The score was 8 to 7, a close game.",
        "There are 60 seconds in a minute.", "The address is 890 North 7th Street.", "Her number is 609-867-5309."
      ] },
      { id: "8-3", name: "All Numbers", texts: [
        "123 456 7890", "my pin is 4821 and my code is 9035", "the address is 123 Main St, Anytown, USA 90210",
        "call me at 555-123-4567 extension 890", "The total is 1,234,567.90", "flight 370, gate 8, seat 19A",
        "on page 42, line 1, paragraph 6", "The war of 1812 was a long time ago.", "invoice 7890, amount 123.45",
        "He was born on 05/10/1996.", "The population is about 7,800,000,000.", "The IP address is 192.168.1.1.",
        "ISBN 978-3-16-148410-0", "The coordinates are 40.7128 N, 74.0060 W.", "My bank account has $1,024.50."
      ] },
    ]
  },
  {
    id: "chapter-9",
    name: "Chapter 9: Number Row Symbols",
    description: "Master the symbols above the numbers, essential for coding and writing.",
    lessons: [
      { id: "9-1", name: "Symbols !@#$%^", texts: [
        "!@#$%^ !@#$%^ !@#$%^", "shift+1 shift+2 shift+3", "Wow! That's a lot of $$$.",
        "The email is user@example.com", "This is #trending! What a ^ day!", "50% off! That's a great deal!",
        "AT&T is a company. So is P&G.", "You & I can go together.", "My password is a*b*c*d.",
        "2^8 is 256. 5^3 is 125.", "This is #awesome! I feel 100%!", "My email is user@domain.com.",
        "The price is $50, a 50% discount!", "AT&T and P&G are big companies.", "The caret ^ symbol is above the 6."
      ] },
      { id: "9-2", name: "Symbols &*()_+", texts: [
        "&*()_+ &*()_+ &*()_+", "shift+7 shift+8 shift+9", "Call me at (123) 456-7890.",
        "This is the main_file.txt", "2 + 2 = 4. 5 - 1 = 4.", "The formula is y = mx + b.",
        "He works at AT&T. This is a &.", "A (parenthetical) statement.", "My password is secure_password_123.",
        "This is a long_file_name.py", "The file is called `main_script.js`", "The sum is (a + b) * c.",
        "a_b_c + d_e_f = g_h_i", "The function is `calculate_sum()`.", "Use parentheses () for grouping."
      ] },
      { id: "9-3", name: "Mixed Symbols", texts: [
        "My email is test_user@email.com! #social", "The total cost is $5.00 (tax included).",
        "I need 50% of the profit, which is $1,000.", "The function is `get_data()`.",
        "The equation is (x^2 + y^2 = r^2).", "Hello, world! My name is user_123.",
        "The file path is /home/user/my_app/main.js.", "Her name is Sarah & she's 25.",
        "Password must contain a symbol: !@#$%^&*().", "The URL is https://example.com/search?q=query",
        "The stock price rose by 5% ($2.50)!", "Her username is @sarah_codes#2024.", "The answer is (4 + 5) * 6 = 54.",
        "Check this out: `file.txt` & `image.jpg`!", "The discount is 25% for items over $100."
      ] },
    ]
  },
  {
    id: "chapter-10",
    name: "Chapter 10: Common Words & Patterns",
    description: "Build practical speed by drilling the most common words and letter combinations.",
    lessons: [
        { id: "10-1", name: "100 Common Words", texts: [
          "the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us",
          "it is a good day to have some fun with all the people we know and see. they will be here soon. i want you to think about what to do first. we can go out or just look at the sky. there is no other way. how could we make this work? any new ideas? after that, we can take some time for our work.",
          "one day, a good person will come and say hello. they would see what we have been doing. it is just a matter of time. there are other people who think like us. your way is not the only way. i want to get to know them well. how could we do that? we can use our time to make a good plan because it is important.",
          "the people from that town say they will come over to our place. it is a good thing to do. we could have some fun. i think they want to see your new work. how about we make some good food for them? i will get what we need. you can just be here when they arrive. it is the first time for them.",
          "i know that you have been working hard on this for a long time. it is good to see that your work is now paying off. people will get to know about what you do. there is no other way but up from here. i am so happy for you. we should go out and celebrate. i will make the arrangements.",
          "the first thing to do is to get all the people together. we can then talk about our new plan. it is a good way to make sure everyone is on the same page. i think it will work out well. we have a lot of good ideas. we just need to put them into action. what do you think?",
          "we could see the other people from over there. they look like they are having a good time. i want to go and talk to them. what if they are not friendly? we will never know if we do not try. let's just go and say hi. it is a good day for making new friends.",
          "there is no way to know what will happen. we just have to do our best and see what comes out of it. it is a good thing that we are working together on this. we can help each other out. i think we will be able to make it work. what do you say?",
          "after all this time, we are finally here. it has been a long journey, but it was worth it. we have learned so much along the way. i am proud of what we have accomplished. we should take some time to enjoy our success. we have earned it.",
          "he said that he would be here by now. i wonder what happened. maybe he got stuck in traffic. i hope he is okay. we should give him a call to check on him. it is always better to be safe than sorry. i will call him now.",
          "she is a good person to have on your team. she is smart, hardworking, and always willing to help out. i am glad that she is working with us on this project. we are lucky to have her. i think we will be able to do great things together.",
          "i want to get a new car. my old one is not working so well anymore. it is time for an upgrade. i have been saving up for a while now. i think i can finally afford it. i am so excited to go car shopping this weekend.",
          "the sky is so blue today. it is a beautiful day to be outside. i think i will go for a walk in the park. it is a good way to get some fresh air and exercise. i might even see some squirrels and birds along the way.",
          "this is a good book to read. it is full of interesting characters and a captivating plot. i would recommend it to anyone who likes a good story. i am sure you will enjoy it as much as i did. you should give it a try.",
          "i like to listen to music when i work. it helps me to concentrate and stay focused. i have a playlist of my favorite songs that i listen to every day. it is a good way to make my work more enjoyable. what kind of music do you like to listen to?"
        ] },
        { id: "10-2", name: "Common Bigrams", texts: [
          "th er on an re he in ed nd ha at en es of or nt ea ti to is ou st io le ve co me de hi ri ro ic ne te se ar as ld il",
          "the there then that this with other they their heather leather weather together whether",
          "her here where there were person server manager letter never however wherever therefore",
          "an another any and plan man can than random banana antenna command demand channel",
          "re are for more from before after where there here were their therefore wherefore",
          "he the she they then them these there where when whether heather leather weather",
          "in is it if in into since find think behind window finish minute thing king bring",
          "ed need indeed deed feed seed weed bleed breed creed speed freed agreed need",
          "nd and end find kind mind behind land hand sand band grand stand command",
          "ha have has had that what than thank thatcher bath math path hath aftermath",
          "at that what cat fat hat mat pat rat sat vat chat splat combat format",
          "en then when hen ten pen men den ken yen amen open happen often chosen",
          "es yes bless dress guess mess press stress less unless address progress",
          "of off often office offer coffee toffee proffer scoff doff loff sofoft",
          "or for more store before ignore score shore tore wore yore snore explore"
        ] },
        { id: "10-3", name: "Common Trigrams", texts: [
          "the and ing her ere ent tha nth was eth for dth tio ion ate all ett ver ter est ers ate ive",
          "the and for was his that with are but had you not all her she one our out day get has him",
          "going running typing playing looking making thinking telling asking wanting helping",
          "that the these them there then they thing think this those through thus",
          "and another any anything anyway anywhere hand sand band land grand command",
          "ing king sing ring wing bring thing morning evening something anything nothing",
          "her here there where therefore wherefore furthermore heather weather leather together",
          "ere here there where were merely sincerely severely interfere revere adhere sphere",
          "ent went sent bent rent tent lent client ancient fluent frequent gradient",
          "for form forbear forbid forever forgive forward formal formation formidable",
          "ion action nation station motion option portion section function selection",
          "ate state date late rate fate hate mate pate rate sate create debate",
          "all ball call fall hall mall tall wall stall small recall overall",
          "ver very over never however solver diver river giver liver shiver quiver",
          "ter after letter better matter butter chatter flatter glitter fritter mutter"
        ] },
    ]
  },
  {
    id: "chapter-11",
    name: "Chapter 11: Paragraph & Endurance Drills",
    description: "Build your typing stamina by practicing on full paragraphs of text.",
    lessons: [
        { id: "11-1", name: "Short Paragraphs", texts: [
          "The sun is a star. It is very hot. The sun gives us light and heat. Without the sun, there would be no life on Earth. Plants use sunlight to make food. We get energy from the sun. It is the center of our solar system.",
          "A computer is a machine that can be programmed to carry out sequences of arithmetic or logical operations automatically. Modern computers can perform generic sets of operations known as programs. These programs enable computers to perform a wide range of tasks.",
          "The ocean is a huge body of saltwater that covers about 71 percent of Earth's surface. The planet has one global ocean, though oceanographers and the countries of the world have traditionally divided it into four distinct regions: the Pacific, Atlantic, Indian, and Arctic oceans.",
          "Learning a new language can be a rewarding experience. It opens up new cultures and ways of thinking. With dedication, anyone can become proficient. Regular practice is the most important aspect of learning. Speaking with native speakers is also very beneficial.",
          "Music has a profound effect on the human brain. It can evoke strong emotions and memories. Different genres of music can alter our mood. Classical music, for instance, is often associated with relaxation and focus. It's a universal language that everyone can understand.",
          "Regular exercise is crucial for maintaining physical and mental health. It strengthens the body, improves cardiovascular function, and releases endorphins, which are natural mood boosters. Even a short walk each day can make a significant difference in one's well-being.",
          "The invention of the printing press by Johannes Gutenberg in the 15th century was a pivotal moment in human history. It allowed for the mass production of books and the rapid dissemination of knowledge. This led to increased literacy rates and the spread of new ideas, fueling the Renaissance and the Reformation.",
          "Cooking is both an art and a science. It requires creativity to combine flavors and textures, as well as an understanding of chemistry to know how ingredients interact. Following a recipe is a good start, but true mastery comes from experimenting and developing one's own style.",
          "Sleep is a vital function that allows our bodies and minds to recharge. During sleep, the brain processes information and consolidates memories. Lack of adequate sleep can impair cognitive function, mood, and physical health. Aiming for 7-9 hours per night is recommended for most adults.",
          "The Great Wall of China is one of the most impressive architectural feats in history. It was built over centuries to protect Chinese states and empires against the raids and invasions of nomadic groups. It is a powerful symbol of the country's enduring strength and ingenuity."
        ] },
        { id: "11-2", name: "Medium Paragraphs", texts: [
          "Touch typing is the ability to type without looking at the keyboard. The fingers hit the keys based on muscle memory. This method significantly increases typing speed and reduces errors. It's a valuable skill in today's digital world, where most communication and work is done on a computer. Practicing regularly is the key to mastering touch typing. It involves starting with the home row keys and gradually learning the other keys. Consistency and patience are crucial for success. In the long run, it saves a lot of time and effort.",
          "The history of the internet has its roots in the 1960s as a project of the United States government intended to build a communication network that could withstand a nuclear attack. The project, called ARPANET, was developed by the Advanced Research Projects Agency (ARPA). It was the first network to use the TCP/IP protocol, which is still the standard for the internet today. Over the years, it evolved from a military project to a public network connecting universities and research institutions, eventually becoming the global commercial network we know today.",
          "Climate change represents a significant challenge to the global community. The scientific consensus is that the Earth's climate is warming at an unprecedented rate, primarily due to human activities such as the burning of fossil fuels and deforestation. The consequences of this warming include rising sea levels, more frequent and intense extreme weather events, and disruptions to ecosystems. Addressing this issue requires a coordinated global effort to reduce greenhouse gas emissions, transition to renewable energy sources, and adapt to the changes that are already underway.",
          "The Industrial Revolution, which began in Great Britain in the late 18th century, was a period of profound technological and social change. Innovations such as the steam engine and the power loom transformed manufacturing processes, leading to the rise of factories and mass production. This period saw a massive migration of people from rural areas to cities in search of work, leading to rapid urbanization and the growth of new social classes. While it brought about unprecedented economic growth, it also created significant social problems, including poor working conditions and environmental pollution.",
          "The concept of democracy, originating in ancient Athens, is a system of government where the supreme power is vested in the people and exercised by them directly or indirectly through a system of representation usually involving periodically held free elections. A key principle of democracy is the protection of human rights, including freedom of speech, assembly, and religion. While the implementation of democracy can vary widely from one country to another, its core ideals of liberty and equality have inspired people around the world for centuries.",
          "The Amazon rainforest, located in South America, is the largest tropical rainforest in the world. It is home to an incredible diversity of plant and animal species, many of which are still unknown to science. The rainforest plays a crucial role in regulating the Earth's climate by absorbing vast amounts of carbon dioxide from the atmosphere. However, it is under threat from deforestation due to logging, agriculture, and mining. Protecting the Amazon is essential for preserving biodiversity and combating climate change.",
          "The Renaissance was a period of intense artistic and intellectual activity, said to be a 'rebirth' of Greco-Roman culture. Spanning roughly from the 14th to the 17th century, it began in Italy and spread throughout Europe. This era produced some of the world's most famous artists, such as Leonardo da Vinci and Michelangelo, as well as influential thinkers like Machiavelli and Erasmus. The Renaissance spirit of humanism emphasized the potential for human achievement and led to significant advancements in art, science, and literature.",
          "The development of vaccines has been one of the most important public health achievements in history. Vaccines work by introducing a harmless version of a pathogen into the body, which stimulates the immune system to produce antibodies. This creates immunity without causing the disease itself. Thanks to vaccines, diseases that were once common and deadly, such as smallpox and polio, have been largely eradicated or controlled. Continued vaccination programs are essential for preventing the re-emergence of these and other infectious diseases.",
          "The human brain is an incredibly complex organ responsible for our thoughts, emotions, and actions. It is composed of billions of neurons that communicate with each other through electrical and chemical signals. Different regions of the brain are specialized for different functions, such as language, vision, and memory. Despite centuries of research, we are still just beginning to understand the full extent of the brain's capabilities and the mysteries of consciousness. Neuroscience is a rapidly advancing field that promises to unlock many of these secrets.",
          "The global financial system is an intricate network of banks, financial institutions, and markets that facilitate the flow of money and credit around the world. It plays a vital role in economic growth by channeling savings into investment and enabling international trade. However, the system is also prone to crises, as demonstrated by the 2008 financial crisis. Regulators and policymakers are constantly working to improve the resilience of the system and prevent future crises through measures such as capital requirements and stress tests."
        ] },
        { id: "11-3", name: "Long Paragraphs", texts: [
          "Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by humans and other animals. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of successfully achieving its goals. The term 'artificial intelligence' had previously been used to describe machines that mimic and display 'human' cognitive skills that are associated with the human mind, such as 'learning' and 'problem-solving'. This definition has since been rejected by major AI researchers who now describe AI in terms of rationality and acting rationally, which does not limit how intelligence can be articulated. AI applications include advanced web search engines (e.g., Google), recommendation systems (used by YouTube, Amazon and Netflix), understanding human speech (such as Siri and Alexa), self-driving cars (e.g., Tesla), automated decision-making and competing at the highest level in strategic game systems (such as chess and Go).",
          "Global warming is the long-term heating of Earth's climate system observed since the pre-industrial period (between 1850 and 1900) due to human activities, primarily fossil fuel burning, which increases heat-trapping greenhouse gas levels in Earth's atmosphere. The term is frequently used interchangeably with the term climate change, though the latter refers to both human- and naturally produced warming and the effects it has on our planet. It is most commonly measured as the average increase in Earth's global surface temperature. Since the pre-industrial period, human activities are estimated to have increased Earth's global average temperature by about 1 degree Celsius (1.8 degrees Fahrenheit), a number that is currently increasing by 0.2 degrees Celsius (0.36 degrees Fahrenheit) per decade. It is unequivocal that human influence has warmed the atmosphere, ocean, and land.",
          "The theory of relativity, developed by Albert Einstein, is one of the two pillars of modern physics, alongside quantum mechanics. It is composed of two main parts: special relativity and general relativity. Special relativity, published in 1905, deals with the relationship between space and time for objects moving at constant speeds. It introduced the famous equation E=mc^2, which shows the equivalence of mass and energy. General relativity, published in 1915, is a theory of gravitation. It describes gravity not as a force, but as a curvature of spacetime caused by the mass and energy of objects. This theory has been confirmed by numerous experiments and observations, and it is the foundation for our current understanding of the large-scale structure of the universe.",
          "The evolution of life on Earth is a vast and complex story that began billions of years ago. The first life forms were simple single-celled organisms. Over time, through the process of natural selection, more complex organisms evolved. This process, proposed by Charles Darwin, suggests that organisms with traits better suited to their environment are more likely to survive and reproduce, passing those advantageous traits on to their offspring. This has led to the incredible diversity of life we see today, from microscopic bacteria to giant blue whales. The fossil record provides a rich history of this evolutionary journey, showing the rise and fall of countless species over geological time.",
          "The rise of social media has fundamentally changed the way we communicate and interact with each other. Platforms like Facebook, Twitter, and Instagram have connected billions of people around the world, allowing for the instant sharing of information and ideas. This has had a profound impact on society, influencing everything from politics and business to personal relationships. While social media has many benefits, such as facilitating social movements and providing a sense of community, it also has a dark side. Issues such as misinformation, cyberbullying, and privacy concerns have become major challenges in the digital age. Navigating this new landscape requires a critical and thoughtful approach to our online lives.",
          "The field of quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science. One of the most counterintuitive aspects of quantum mechanics is the concept of superposition, where a particle can exist in multiple states at the same time. Another is entanglement, where two particles can be linked in such a way that their fates are intertwined, no matter how far apart they are. Despite its bizarre nature, quantum mechanics has been incredibly successful, and it is essential for understanding the behavior of matter and energy at the smallest scales.",
          "The digital revolution, also known as the Third Industrial Revolution, is the shift from mechanical and analog electronic technology to digital electronics which began in the late 20th century. The invention of the microprocessor and the development of the personal computer were key milestones in this process. This was followed by the creation of the World Wide Web, which made the internet accessible to the general public. The digital revolution has had a transformative impact on almost every aspect of modern life, changing the way we work, learn, communicate, and entertain ourselves. It has also created new industries and business models, and it continues to evolve at a rapid pace.",
          "The human immune system is a complex network of cells, tissues, and organs that work together to defend the body against harmful invaders such as bacteria, viruses, and fungi. It is composed of two main parts: the innate immune system, which provides a general defense against common pathogens, and the adaptive immune system, which develops a targeted response to specific pathogens that it has encountered before. This creates immunological memory, which is why we often become immune to a disease after we have had it once. The immune system is essential for our survival, but it can also sometimes malfunction, leading to autoimmune diseases where the body attacks its own tissues.",
          "The study of economics is broadly divided into two main branches: microeconomics and macroeconomics. Microeconomics focuses on the behavior of individual agents and markets. It examines how households and firms make decisions and how they interact in specific markets. Topics in microeconomics include supply and demand, market structures, and the behavior of consumers and producers. Macroeconomics, on the other hand, looks at the economy as a whole. It examines economy-wide phenomena such as inflation, unemployment, and economic growth. Topics in macroeconomics include gross domestic product (GDP), monetary policy, and fiscal policy. Both branches are essential for understanding the complexities of the modern economy.",
          "The exploration of space is one of humanity's greatest adventures. It began in the mid-20th century with the launch of the first artificial satellite, Sputnik, by the Soviet Union. This sparked the Space Race between the United States and the Soviet Union, which culminated in the Apollo 11 mission landing the first humans on the Moon in 1969. Since then, we have sent robotic probes to explore every planet in our solar system, and we have built space telescopes that have allowed us to peer deep into the universe. Space exploration has not only expanded our scientific knowledge, but it has also inspired generations of people to dream of what is possible."
        ] },
    ]
  },
  {
    id: "chapter-12",
    name: "Chapter 12: Code Snippet Showcase",
    description: "Hone your coding speed with snippets from popular programming languages.",
    lessons: [
      { id: "12-1", name: "HTML", texts: [
`<!-- Basic Form -->
<form action="/submit" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username">
  <button type="submit">Submit</button>
</form>`,
`<!-- Semantic Layout -->
<header><h1>My Website</h1></header>
<nav>
  <a href="/home">Home</a>
  <a href="/about">About</a>
</nav>
<main>
  <article><h2>Article Title</h2><p>Article content.</p></article>
</main>
<footer><p>&copy; 2024 My Website</p></footer>`,
`<!-- Image with Figure -->
<figure>
  <img src="image.jpg" alt="A descriptive alt text for an image" width="500" height="300">
  <figcaption>This is the caption for the image above.</figcaption>
</figure>`,
`<!-- Details & Summary -->
<details>
  <summary>Click to see more details</summary>
  <p>Here is some hidden information that is now visible after you clicked the summary element.</p>
</details>`,
`<!-- Table Structure -->
<table>
  <caption>Monthly Report</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Salary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Developer</td>
      <td>$100,000</td>
    </tr>
  </tbody>
</table>`,
`<!-- Unordered List -->
<ul>
  <li>First item in the list</li>
  <li>Second item, slightly different</li>
  <li>Third and final item</li>
</ul>`,
`<!-- Iframe Embed -->
<iframe 
  src="https://example.com" 
  width="600" 
  height="400" 
  title="An example iframe"
  frameborder="0" 
  allowfullscreen>
</iframe>`,
`<!-- Fieldset for Grouping -->
<fieldset>
  <legend>User Information</legend>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
  <label for="password">Password:</label>
  <input type="password" id="password" name="password">
</fieldset>`,
`<!-- Navigation Block -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`,
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page Title</title>
</head>
<body>
    <p>Hello World, this is a sample paragraph in the body.</p>
</body>
</html>`,
`<!-- Video Element -->
<video controls width="250">
    <source src="/media/cc0-videos/flower.webm" type="video/webm">
    Sorry, your browser doesn't support embedded videos.
</video>`,
`<!-- Audio Element -->
<audio controls src="/media/cc0-audio/t-rex-roar.mp3">
    Your browser does not support the
    <code>audio</code> element.
</audio>`,
`<!-- Data List -->
<label for="browser">Choose a browser:</label>
<input list="browsers" id="browser-choice" name="browser-choice" />
<datalist id="browsers">
    <option value="Chrome"></option>
    <option value="Firefox"></option>
</datalist>`,
`<!-- Progress Bar -->
<label for="file">Downloading progress:</label>
<progress id="file" max="100" value="70"> 70% </progress>`,
`<!-- Quoting Text -->
<blockquote cite="http://www.worldwildlife.org/who/index.html">
  <p>For 60 years, WWF has worked to help people and nature thrive.</p>
</blockquote>`
      ] },
      { id: "12-2", name: "CSS", texts: [
`/* Flexbox Centering */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
`/* CSS Grid Layout */
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}`,
`/* Custom Properties (Variables) */
:root {
  --main-bg-color: hsl(222, 47%, 11%);
  --main-txt-color: hsl(210, 40%, 98%);
}
body {
  background-color: var(--main-bg-color);
  color: var(--main-txt-color);
}`,
`/* Keyframe Animation */
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.element {
  animation: slide-in 0.5s ease-out forwards;
}`,
`/* Simple Media Query */
@media (max-width: 768px) {
  .main-navigation {
    display: none;
  }
  .hamburger-menu {
    display: block;
  }
}`,
`/* Pseudo-element for Tooltip */
.tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px;
  border-radius: 3px;
}`,
`/* Attribute Selector */
a[href$=".pdf"] {
  padding-right: 20px;
  background: url('pdf-icon.png') no-repeat right center;
}
input[type="submit"] {
  cursor: pointer;
  background-color: blue;
}`,
`/* Button Styling */
.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.btn-primary:hover {
  background-color: #0056b3;
}`,
`/* Basic Transition */
.card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}`,
`/* Styling Links */
a {
  color: #007bff;
  text-decoration: none;
  position: relative;
}
a:hover::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #007bff;
  left: 0;
  bottom: -2px;
}`,
`/* Box Shadow */
.card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08);
}`,
`/* Gradient Background */
body {
  background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
}`,
`/* Sibling Selector */
input:focus + label {
  color: #007bff;
  font-weight: bold;
}`,
`/* Style for disabled button */
button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}`,
`/* Font Face Rule */
@font-face {
  font-family: 'MyWebFont';
  src: url('myfont.woff2') format('woff2'),
       url('myfont.woff') format('woff');
}`
      ] },
      { id: "12-3", name: "JavaScript", texts: [
`// Async/Await Fetch
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}`,
`// Array.map()
const numbers = [1, 4, 9, 16];
const roots = numbers.map((num) => Math.sqrt(num));
console.log(roots); // [1, 2, 3, 4]`,
`// Array.filter()
const words = ['spray', 'limit', 'elite', 'exuberant'];
const result = words.filter(word => word.length > 6);
console.log(result); // ['exuberant']`,
`// Event Listener
const button = document.querySelector('#myButton');
button.addEventListener('click', (event) => {
  console.log('Button clicked!', event.target);
  alert('Button was clicked!');
});`,
`// Class Definition
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  get area() {
    return this.calcArea();
  }
  calcArea() {
    return this.height * this.width;
  }
}`,
`// Arrow Function with map
const materials = ['Hydrogen', 'Helium', 'Lithium'];
const lengths = materials.map(material => material.length);
console.log(lengths); // [8, 6, 7]`,
`// Object Destructuring
const person = { firstName: "John", lastName: "Doe", age: 50 };
const { firstName, age } = person;
console.log(firstName, age); // "John" 50`,
`// DOM Manipulation
const container = document.getElementById('container');
const p = document.createElement('p');
p.textContent = 'Hello, DOM!';
p.classList.add('new-paragraph');
container.appendChild(p);`,
`// localStorage
localStorage.setItem('username', 'JohnDoe');
const username = localStorage.getItem('username');
if (username) {
  console.log('Welcome back, ' + username);
}`,
`// Ternary Operator
function getFee(isMember) {
  return (isMember ? '$2.00' : '$10.00');
}
console.log(getFee(true)); // '$2.00'`,
`// Array.reduce()
const array = [1, 2, 3, 4];
const sum = array.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(sum); // 10`,
`// Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];
console.log(arr2);`,
`// Promises
const myPromise = new Promise((resolve, reject) => {
  let condition = true;
  if (condition) {
    resolve("Promise is resolved!");
  } else {
    reject("Promise is rejected!");
  }
});`,
`// setTimeout
console.log("Start");
setTimeout(() => {
  console.log("This message is shown after 2 seconds");
}, 2000);
console.log("End");`,
`// JSON parsing
const jsonString = '{"name":"John", "age":30, "city":"New York"}';
const jsonObj = JSON.parse(jsonString);
console.log(jsonObj.name); // John`
      ] },
      { id: "12-4", name: "Java", texts: [
`// Simple Class
public class Dog {
    String breed;
    int age;
    void bark() {
        System.out.println("Woof! Woof!");
    }
}`,
`// For-Each Loop
import java.util.ArrayList;
class Main {
  public static void main(String[] args) {
    ArrayList<String> cars = new ArrayList<String>();
    cars.add("Volvo");
    cars.add("BMW");
    for (String car : cars) {
      System.out.println(car);
    }
  }
}`,
`// Method Overloading
public class Data {
    public int add(int a, int b) {
        return a + b;
    }
    public double add(double a, double b) {
        return a + b;
    }
    public String add(String a, String b) {
        return a + b;
    }
}`,
`// Simple Inheritance
class Animal {
  public void animalSound() {
    System.out.println("The animal makes a sound");
  }
}
class Pig extends Animal {
  public void animalSound() {
    System.out.println("The pig says: wee wee");
  }
}`,
`// Try-Catch Block
try {
  int[] myNumbers = {1, 2, 3};
  System.out.println(myNumbers[10]);
} catch (ArrayIndexOutOfBoundsException e) {
  System.out.println("Index out of bounds.");
} finally {
  System.out.println("The 'try catch' is finished.");
}`,
`// HashMap
import java.util.HashMap;
HashMap<String, String> capitalCities = new HashMap<String, String>();
capitalCities.put("England", "London");
capitalCities.put("Germany", "Berlin");
System.out.println(capitalCities.get("England"));`,
`// Reading a file with Scanner
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
try {
  File myObj = new File("filename.txt");
  Scanner myReader = new Scanner(myObj);
  myReader.close();
} catch (FileNotFoundException e) {
  e.printStackTrace();
}`,
`// Interface
interface Vehicle {
  void start();
  void stop();
  int getSpeed();
}
class Car implements Vehicle {
  // implementation here...
}`,
`// Abstract Class
abstract class Shape {
  public abstract double getArea();
  public void printShape() {
    System.out.println("This is a shape.");
  }
}`,
`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World! This is a classic.");
    }
}`,
`// StringBuilder
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" ");
sb.append("World");
String result = sb.toString();`,
`// Lambda Expression
import java.util.ArrayList;
ArrayList<Integer> numbers = new ArrayList<Integer>();
numbers.add(5);
numbers.forEach((n) -> { System.out.println(n); });`,
`// Enum
enum Level {
  LOW,
  MEDIUM,
  HIGH
}
Level myVar = Level.MEDIUM;`,
`// Generics
class Box<T> {
  private T t;
  public void add(T t) {
    this.t = t;
  }
}`,
`// Static method
public class Calculator {
  static int add(int a, int b) {
    return a + b;
  }
}`
      ] },
      { id: "12-5", name: "C", texts: [
`// Struct Definition
struct Point {
   int x;
   int y;
};
struct Point p1;`,
`// For Loop
#include <stdio.h>
int main() {
    for (int i = 1; i <= 5; ++i) {
        printf("Value: %d\\n", i);
    }
    return 0;
}`,
`// Malloc and Free
#include <stdlib.h>
int* ptr;
ptr = (int*) malloc(10 * sizeof(int));
if (ptr == NULL) {
    printf("Memory not allocated.\\n");
} else {
    free(ptr);
}`,
`// File I/O
#include <stdio.h>
int main() {
    FILE *fptr;
    fptr = fopen("program.txt", "w");
    if (fptr != NULL) {
        fprintf(fptr, "%s", "Hello from file!");
        fclose(fptr);
    }
    return 0;
}`,
`// Function Pointer
#include <stdio.h>
void my_func() {
    printf("Function pointer called\\n");
}
int main() {
    void (*func_ptr)() = &my_func;
    (*func_ptr)();
    return 0;
}`,
`// String copy using strcpy
#include <string.h>
#include <stdio.h>
int main() {
    char src[50] = "This is the source.";
    char dest[50];
    strcpy(dest, src);
    printf("Destination: %s\\n", dest);
    return 0;
}`,
`// Switch Statement
switch (operator) {
    case '+':
        result = num1 + num2;
        break;
    case '-':
        result = num1 - num2;
        break;
    default:
        printf("Error! Operator is not correct");
}`,
`// Typedef for struct
typedef struct {
    char name[50];
    int id;
} User;
User user1;`,
`// Pointers
int var = 20;
int *ip;
ip = &var;
printf("Address: %p\\n", (void*)ip);
printf("Value: %d\\n", *ip);`,
`#include <stdio.h>
int main() {
   /* my first program in C */
   printf("Hello, World!\\n");
   return 0;
}`,
`// While loop
int i = 0;
while (i < 5) {
  printf("%d\\n", i);
  i++;
}`,
`// Union
union Data {
   int i;
   float f;
   char str[20];
};`,
`// Preprocessor Macro
#define PI 3.14159
float area = PI * r * r;`,
`// Array of structs
struct Student students[50];
students[0].id = 1;`,
`// Function declaration
int max(int num1, int num2);`
      ] },
      { id: "12-6", name: "C++", texts: [
`// Simple Class
class Rectangle {
    int width, height;
  public:
    void set_values(int w, int h) { width = w; height = h; }
    int area() { return width * height; }
};`,
`// Range-based For Loop
#include <vector>
#include <iostream>
int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    for (int num : numbers) {
        std::cout << num << " ";
    }
    return 0;
}`,
`// Smart Pointers (unique_ptr)
#include <memory>
#include <iostream>
int main() {
    std::unique_ptr<int> p1(new int(5));
    std::cout << *p1 << std::endl;
    // p1 is automatically deleted here.
    return 0;
}`,
`// Templates
template <typename T>
T const& maxVal(T const& a, T const& b) {
    return a < b ? b : a;
}
int i = maxVal(3, 7);`,
`// Standard Library Vector
#include <vector>
std::vector<int> v;
for (int i = 0; i < 10; ++i) {
    v.push_back(i * 10);
}`,
`// Lambda Function
#include <vector>
#include <algorithm>
std::vector<int> v = {1, 2, 3};
std::for_each(v.begin(), v.end(), [](int i) {
    std::cout << i << std::endl;
});`,
`// I/O Streams
#include <iostream>
#include <string>
int main() {
    std::cout << "Enter your name: ";
    std::string name;
    std::getline(std::cin, name);
    std::cout << "Hello, " << name << "!" << std::endl;
    return 0;
}`,
`// Constructor/Destructor
#include <iostream>
class MyClass {
public:
    MyClass() { std::cout << "Constructor called!" << std::endl; }
    ~MyClass() { std::cout << "Destructor called!" << std::endl; }
};`,
`// Namespaces
namespace first { int var = 5; }
namespace second { double var = 3.14; }
int x = first::var;`,
`#include <iostream>
int main() {
    // This is a comment.
    std::cout << "Hello World!" << std::endl;
    return 0;
}`,
`// Operator Overloading
class Point {
public:
  int x, y;
  Point operator+(const Point& other) {
    // ...
  }
};`,
`// Inheritance
class Shape { public: void setWidth(int w) {} };
class Rectangle: public Shape {};`,
`// Polymorphism
class Animal { public: virtual void sound() {} };
class Dog : public Animal { public: void sound() override {} };`,
`// File Streams
#include <fstream>
std::ofstream myfile("example.txt");
if (myfile.is_open()) {
  myfile << "Writing this to a file.\\n";
  myfile.close();
}`,
`// Maps
#include <map>
std::map<std::string, int> ageMap;
ageMap["Alice"] = 30;`
      ] },
      { id: "12-7", name: "Python", texts: [
`# List Comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]`,
`# Function with Default Arguments
def greet(name, msg="Good morning!"):
    """This function greets the person passed in as a parameter."""
    print(f"Hello {name}, {msg}")`,
`# Dictionary
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York",
    "isStudent": True
}
print(person["name"])`,
`# Class Definition
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} says woof!"`,
`# File Handling with 'with'
try:
    with open('file.txt', 'r') as f:
        data = f.read()
        print(data)
except FileNotFoundError:
    print("The file was not found.")`,
`# F-Strings formatting
name = "Eric"
age = 74
print(f"Hello, {name}. You are {age:03d} years old.")`,
`# Try-Except Block
try:
    x = 1 / 0
except ZeroDivisionError as e:
    print(f"Error: Cannot divide by zero. ({e})")
finally:
    print("This will always execute.")`,
`# Importing a module with an alias
import math as m
print(m.sqrt(16))
print(m.pi)`,
`# Lambda Function with filter
my_list = [1, 5, 4, 6, 8, 11, 3, 12]
new_list = list(filter(lambda x: (x%2 == 0), my_list))
print(new_list)`,
`# Decorator
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Something is happening before the function is called.")
        result = func(*args, **kwargs)
        print("Something is happening after the function is called.")
        return result
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")`,
`# Slicing a list
letters = ['a', 'b', 'c', 'd', 'e', 'f']
print(letters[2:5]) # ['c', 'd', 'e']
print(letters[:-1]) # from start to second-to-last`,
`# Generator expression
squares_gen = (x*x for x in range(10))
for num in squares_gen:
    print(num)`,
`# Fetching data with requests
import requests
response = requests.get('https://api.github.com')
print(response.status_code)`,
`# Ternary conditional operator
age = 20
status = "adult" if age >= 18 else "minor"
print(status)`,
`# Creating a virtual environment
# python3 -m venv myenv
# source myenv/bin/activate`
      ] },
    ],
  },
  {
    id: "chapter-13",
    name: "Chapter 13: Speed Building Drills",
    description: "Push your limits with drills designed for raw speed and fluency.",
    lessons: [
      {
        id: "13-1",
        name: "Alphabet Sprints",
        texts: [
          "the quick brown fox jumps over the lazy dog",
          "a b c d e f g h i j k l m n o p q r s t u v w x y z",
          "pack my box with five dozen liquor jugs",
          "amazingly few discotheques provide jukeboxes",
          "the five boxing wizards jump quickly",
          "quick brown dogs jump over the lazy fox",
          "abcdefghijklmnopqrstuvwxyz",
          "zyxw vuts rqpo nmlk jihg fedcba",
          "a quick brown fox jumps over the lazy dog",
          "sphinx of black quartz judge my vow",
          "how quickly daft jumping zebras vex",
          "jackdaws love my big sphinx of quartz",
          "the quick onyx goblin jumps over the lazy dwarf",
          "waltz, nymph, for quick jigs vex bud",
          "quick zephyrs blow, vexing daft Jim"
        ]
      },
      {
        id: "13-2",
        name: "Common Word Chains",
        texts: [
          "the of and to a in that is for it was with as he on have at but not by this from or one had had by word but not what all were we when your can said",
          "there use an each which she do how their if will up other about out many then them these so some her would make like him into time has look two more",
          "write go see number no way could people my than first water been called who am its now find long down day did get come made may part over new sound",
          "take only little work know place years live me back give most very after things our just name good sentence man think say great where help through much",
          "before line right too means old any same tell boy follow came want show also around form three small set put end does another well large must big even such",
          "because turn here why asked men read need land different home us move try kind hand picture again change off play spell air away animal house point",
          "page letter mother answer found study still learn should world high every near add food between own below country plant last school father keep tree never",
          "start city earth eyes light thought head under story saw left don't few while along might close something seem next hard open example begin life always",
          "those both paper together got group often run important until children side feet car mile night walk white sea began grow took river four carry state once",
          "book hear stop without second late miss idea enough eat face watch far indian real almost let above girl sometimes mountain cut young talk soon list song"
        ]
      },
      {
        id: "13-3",
        name: "One-Minute Sprints",
        texts: [
          "The ability to type quickly and accurately is a fundamental skill in the modern world. It allows for more efficient communication, faster completion of tasks, and a more seamless interaction with technology. The journey to becoming a proficient typist is one of practice and patience. It begins with understanding the keyboard layout and proper finger placement. From there, it is a matter of building muscle memory through consistent drills and exercises. Each key press, each word typed, contributes to a growing fluency. It is not just about speed; accuracy is equally, if not more, important. A high word-per-minute count is meaningless if the text is riddled with errors. Therefore, a balanced approach, focusing on both speed and precision, is the most effective path to mastery. This platform is designed to guide you on that path, providing the tools and feedback necessary to unlock your full potential. Keep practicing, and you will see remarkable improvement over time.",
          "Consider the flow of information in our digital age. It is a relentless river, constantly moving, constantly changing. To navigate this river effectively, one must be agile and quick. Typing is the vessel that allows us to travel this river. The faster and more accurately you can type, the more effectively you can engage with this flow of information. You can capture your thoughts as they arise, respond to messages with clarity and speed, and create documents with ease and efficiency. The process of learning to type is an investment in your own productivity. It pays dividends in every aspect of your digital life, from professional correspondence to personal projects. The drills presented here are more than just exercises; they are the building blocks of a new level of digital fluency. Embrace the challenge, focus on your technique, and watch as your ability to communicate and create expands beyond what you thought possible.",
          "What separates a good typist from a great one? It is not just raw speed, but a sense of rhythm and consistency. A great typist moves across the keyboard with a steady, fluid motion, each keystroke evenly spaced. This rhythm is the key to both speed and endurance. It minimizes wasted motion and reduces strain, allowing for longer periods of sustained typing without fatigue. Think of it like a musician playing an instrument. The notes flow together seamlessly, creating a beautiful melody. In the same way, a great typist's keystrokes flow together to create a seamless stream of text. Developing this rhythm takes time and focused practice. It requires listening to the sound of your own typing, feeling the cadence of the keys, and striving for a smooth, consistent pace. The consistency metric in our results is designed to help you track this aspect of your skill. Aim for a high score, and you will be well on your way to becoming a true typing virtuoso.",
          "The journey of a thousand miles begins with a single step. In the world of typing, that single step is placing your fingers on the home row. From that simple, foundational position, the entire keyboard becomes accessible. It is a map, and your fingers are the explorers. Each lesson, each drill, is a new territory to be charted. At first, the movements may feel awkward and slow. You may find yourself looking down at the keys, breaking the fundamental rule of touch typing. But with persistence, the map becomes ingrained in your muscle memory. Your fingers will learn to navigate the terrain without conscious thought, moving with a speed and accuracy that once seemed unattainable. Do not be discouraged by initial struggles. Every expert was once a beginner. The key is to trust the process, practice consistently, and celebrate the small victories along the way. Your journey to typing mastery starts now, with that single, focused step."
        ]
      }
    ]
  },
  {
    id: "chapter-14",
    name: "Chapter 14: Advanced Punctuation",
    description: "Master professional punctuation for polished writing and code.",
    lessons: [
      {
        id: "14-1",
        name: "Quotes: Curly vs. Straight",
        texts: [
          "She said, “Hello, world.” That’s a common phrase.",
          "“I think, therefore I am,” he mused.",
          "It’s Tom’s cat, not the other one’s.",
          "“Don’t use straight quotes ('') for dialogue,” the editor said.",
          "A typographer’s job is to use “smart quotes.”",
          "‘Single quotes’ are used for quotes within quotes.",
          "He shouted, “She said, ‘I’m leaving!’ and then left.”",
          "The 90s were a great time. The ‘90s, to be specific.",
          "“It’s a beautiful day, isn’t it?” she asked.",
          "‘Twas the night before Christmas… a classic line.",
          "Remember to use proper apostrophes for possessives and contractions.",
          "“We’re going to the park,” they announced cheerfully.",
          "The sign read: “Proceed with caution.”",
          "His favorite poem starts with, ‘Two roads diverged…’. ",
          "Using the right quotes—“ ” and ‘ ’—makes text look professional."
        ]
      },
      {
        id: "14-2",
        name: "Dashes: Hyphen, En, Em",
        texts: [
          "Use a hyphen for compound words like state-of-the-art.",
          "The score was 21–17. Use an en dash for ranges.",
          "The workshop is from 9:00 AM–5:00 PM.",
          "An em dash—like this one—can set apart a phrase.",
          "The old-fashioned, hard-working man was tired.",
          "Read pages 50–75 for homework.",
          "She gave him her answer—a resounding no.",
          "The decision was a make-or-break moment for the company.",
          "World War II (1939–1945) was a global conflict.",
          "Everything he needed—pen, paper, and coffee—was on the table.",
          "The New York–London flight is very popular.",
          "It was a split-second decision.",
          "The result was predictable—they won easily.",
          "Follow the step-by-step instructions carefully.",
          "The company’s growth—fueled by innovation—was remarkable."
        ]
      },
      {
        id: "14-3",
        name: "Brackets & Parentheses",
        texts: [
          "He added his own comment [sic] in the quote.",
          "The data (see Appendix A) supports this conclusion.",
          "The array was defined as `items = [1, 2, 3];`.",
          "The function call is `getData({ id: 123 });`.",
          "She mentioned her trip to Paris (the one last spring).",
          "The CSS selector `a[href*=\"example\"]` is useful.",
          "The object `config = { theme: 'dark' };` was set.",
          "Use parentheses () for grouping mathematical expressions.",
          "He whispered (so no one else would hear), “It’s a secret.”",
          "The list of participants [see attached file] is complete.",
          "The regular expression `/[A-Z]/` matches capital letters.",
          "The function `doSomething(arg1, arg2)` takes two arguments.",
          "Nested data looks like `{ data: [1, 2, { key: 'value' }] }`.",
          "The final score (a surprise to everyone) was 3–0.",
          "She read the report [emphasis added] very carefully."
        ]
      },
      {
        id: "14-4",
        name: "Ellipsis, Copyright, & More",
        texts: [
          "He paused and said, “I’m not sure…” and trailed off.",
          "The copyright for this work is © 2024 TypingPath.",
          "The company name is TypingPath™, a registered trademark®.",
          "And so on, and so forth… you get the idea.",
          "The temperature was 32 °F (0 °C).",
          "The formula is E=mc², a famous equation.",
          "This product is patent pending… please wait for the final release.",
          "© 2024. All rights reserved. The TypingPath™ brand is protected.",
          "The recipe calls for 2 cups of flour, 1 cup of sugar, etc…",
          "The ellipsis (…) indicates an omission or a pause.",
          "The ® symbol denotes a registered trademark.",
          "The ™ symbol is used for unregistered trademarks.",
          "The movie was long, boring, tedious… a complete waste of time.",
          "The degree symbol ° is used for temperature and angles.",
          "You must obtain permission from the copyright holder ©."
        ]
      }
    ]
  },
  {
    id: "chapter-15",
    name: "Chapter 15: Famous Quotes & Literature",
    description: "Practice with enduring words from history, poetry, and classic novels.",
    lessons: [
      {
        id: "15-1",
        name: "Wise Words: Famous Quotes",
        texts: [
          "The only thing we have to fear is fear itself. - Franklin D. Roosevelt",
          "That's one small step for a man, one giant leap for mankind. - Neil Armstrong",
          "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
          "The way to get started is to quit talking and begin doing. - Walt Disney",
          "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
          "If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt",
          "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
          "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. - Martin Luther King Jr.",
          "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
          "Tell me and I forget. Teach me and I remember. Involve me and I learn. - Benjamin Franklin",
          "It is during our darkest moments that we must focus to see the light. - Aristotle",
          "Whoever is careless with the truth in small matters cannot be trusted with important matters. - Albert Einstein",
          "The only impossible journey is the one you never begin. - Tony Robbins",
          "You will face many defeats in life, but never let yourself be defeated. - Maya Angelou",
          "Life is what happens when you're busy making other plans. - John Lennon"
        ]
      },
      {
        id: "15-2",
        name: "Poetry in Motion",
        texts: [
          "Two roads diverged in a wood, and I— I took the one less traveled by, And that has made all the difference. - Robert Frost, 'The Road Not Taken'",
          "Shall I compare thee to a summer’s day? Thou art more lovely and more temperate. - William Shakespeare, Sonnet 18",
          "Because I could not stop for Death – He kindly stopped for me – The Carriage held but just Ourselves – And Immortality. - Emily Dickinson",
          "I wandered lonely as a cloud That floats on high o'er vales and hills, When all at once I saw a crowd, A host, of golden daffodils; - William Wordsworth, 'I Wandered Lonely as a Cloud'",
          "Hope is the thing with feathers That perches in the soul, And sings the tune without the words, And never stops at all. - Emily Dickinson",
          "Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light. - Dylan Thomas",
          "O Captain! my Captain! our fearful trip is done, The ship has weather’d every rack, the prize we sought is won. - Walt Whitman",
          "The woods are lovely, dark and deep, But I have promises to keep, And miles to go before I sleep, And miles to go before I sleep. - Robert Frost, 'Stopping by Woods on a Snowy Evening'",
          "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take arms against a sea of troubles And by opposing end them. - William Shakespeare, 'Hamlet'",
          "Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume of forgotten lore— - Edgar Allan Poe, 'The Raven'",
          "I am the master of my fate, I am the captain of my soul. - William Ernest Henley, 'Invictus'",
          "So long as men can breathe or eyes can see, So long lives this, and this gives life to thee. - William Shakespeare, Sonnet 18",
          "Water, water, every where, And all the boards did shrink; Water, water, every where, Nor any drop to drink. - Samuel Taylor Coleridge, 'The Rime of the Ancient Mariner'",
          "Theirs not to make reply, Theirs not to reason why, Theirs but to do and die. Into the valley of Death Rode the six hundred. - Alfred, Lord Tennyson, 'The Charge of the Light Brigade'",
          "I'm nobody! Who are you? Are you nobody, too? Then there's a pair of us - don't tell! They'd banish us, you know. - Emily Dickinson"
        ]
      },
      {
        id: "15-3",
        name: "Classic Prose",
        texts: [
          "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair. - Charles Dickens, 'A Tale of Two Cities'",
          "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. - Jane Austen, 'Pride and Prejudice'",
          "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since. ‘Whenever you feel like criticizing any one,’ he told me, ‘just remember that all the people in this world haven’t had the advantages that you’ve had.’ - F. Scott Fitzgerald, 'The Great Gatsby'",
          "It was a bright cold day in April, and the clocks were striking thirteen. - George Orwell, '1984'",
          "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. - Herman Melville, 'Moby-Dick'",
          "Happy families are all alike; every unhappy family is unhappy in its own way. - Leo Tolstoy, 'Anna Karenina'",
          "All animals are equal, but some animals are more equal than others. - George Orwell, 'Animal Farm'",
          "The past is a foreign country; they do things differently there. - L.P. Hartley, 'The Go-Between'",
          "I am no bird; and no net ensnares me: I am a free human being with an independent will. - Charlotte Brontë, 'Jane Eyre'",
          "It was a pleasure to burn. It was a special pleasure to see things eaten, to see things blackened and changed. - Ray Bradbury, 'Fahrenheit 451'",
          "There is no greater agony than bearing an untold story inside you. - Maya Angelou, 'I Know Why the Caged Bird Sings'",
          "The world breaks every one and afterward many are strong at the broken places. - Ernest Hemingway, 'A Farewell to Arms'",
          "We were the people who were not in the papers. We lived in the blank white spaces at the edges of print. It gave us more freedom. We lived in the gaps between the stories. - Margaret Atwood, 'The Handmaid's Tale'",
          "Whatever our souls are made of, his and mine are the same. - Emily Brontë, 'Wuthering Heights'",
          "Last night I dreamt I went to Manderley again. - Daphne du Maurier, 'Rebecca'"
        ]
      }
    ]
  }
];
