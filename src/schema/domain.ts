// USER
// {
//     "_id": { "$oid": "67d8c06c81e5d16e5066cb51" },
//     "username": "Tony",
//     "email": "tonystark@yahoo.com",
//     "password_hash": {
//     "$binary": {
//         "base64": "JDJiJDEyJE9YT1cveUloRjBUelQ4UHRmLm9mQ2VVQmQya2kuckk2ZWtsY1A3WXZTeUhyM2lNem1jVUVX",
//             "subType": "00"
//     }
// },
//     "first_name": "Tony",
//     "last_name": "Stark",
//     "created_at": {
//     "$date": { "$numberLong": "1741300311888" }
// },
//     "last_login": {
//     "$date": { "$numberLong": "1741342493234" }
// },
//     "is_admin": false,
//     "is_active": true,
//     "is_verified": false,
//     "verification_token": "604c23ce-05a4-44ca-84e2-963aa4a33b50",
//     "verification_token_expiry": {
//     "$numberDouble": "1741386711.888847"
// },
//     "profile": {
//     "avatar": null,
//         "bio": null,
//         "education_level": null,
//         "subjects": []
// },
//     "preferences": {
//     "theme": "light",
//         "notification_email": true,
//         "language": "en",
//         "study_reminder": false
// },
//     "study_stats": {
//     "total_study_time": { "$numberInt": "0" },
//     "quizzes_completed": { "$numberInt": "0" },
//     "flashcards_reviewed": { "$numberInt": "0" },
//     "last_activity": {
//         "$date": { "$numberLong": "1741342493234" }
//     }
// },
//     "security": {
//     "password_reset_token": null,
//         "password_reset_expiry": null,
//         "failed_login_attempts": {
//         "$numberInt": "0"
//     },
//     "last_password_change": {
//         "$date": { "$numberLong": "1741300311888" }
//     }
// }
// }


// COURSES
// {
//     "_id": { "$oid": "67d8c09881e5d16e5066cb52" },
//     "user_id": {
//     "$oid": "67c6fac1fe6c7457202ed9b8"
// },
//     "title": "Introduction to Python",
//     "description": "Learn Python programming basics",
//     "created_at": {
//     "$date": { "$numberLong": "1741093569537" }
// },
//     "last_updated": {
//     "$date": { "$numberLong": "1741093569855" }
// }
// }


// Flashcards Deck
// {
//     "_id": { "$oid": "67d8c0e181e5d16e5066cb53" },
//     "module_id": {
//     "$oid": "67c6fac1fe6c7457202ed9ba"
// },
//     "title": "Python Basics Flashcards",
//     "cards": [
//     {
//         "front": "What is a variable?",
//         "back": "A named location in memory that stores a value"
//     },
//     {
//         "front": "What is an integer?",
//         "back": "A whole number without a decimal point"
//     }
// ],
//     "created_at": {
//     "$date": { "$numberLong": "1741093569628" }
// },
//     "last_updated": {
//     "$date": { "$numberLong": "1741093569628" }
// }
// }


// MODULES
// {
//     "_id": { "$oid": "67d8c18181e5d16e5066cb54" },
//     "course_id": {
//     "$oid": "67c6fac1fe6c7457202ed9b9"
// },
//     "title": "Variables and Data Types",
//     "description": "Understanding Python variables and basic data types",
//     "created_at": {
//     "$date": { "$numberLong": "1741093569566" }
// },
//     "last_updated": {
//     "$date": { "$numberLong": "1741093569833" }
// }
// }


// NOTES
// {
//     "_id": { "$oid": "67d8c1c681e5d16e5066cb55" },
//     "title": "Data Structures and Algorithms",
//     "topic": "Data Structures and Algorithms",
//     "content": "## COMP 202 - Adv Algorithms\n\n## Week 1\n\n<!-- image -->\n\n🤓 Algorithm is any well-defined computational procedure that takes an input and produces an output\n\n## Algorithm analysis\n\n- When analysing algorithms we are worried about\n- 1st  Running time\n- 2nd  Space usage\n- 3rd  Optimality of the solution\n- Types\n- Experimental analysis\n- Analysis made upon running the algorithm on a big and selected set of inputs\n- Varies based on input, algorithm used, software and hardware\n- Theoretical analysis\n- Involve studying algorithms based on theirs high-level description Pseudo-code)\n- Asymptotic notation\n- Allows characterization of the main factors affecting runtime\n\n- Big-O is the most commonly used form\n\n## NP-complete problems\n\n- A set of problems which an efficient is not known\n- Properties\n- Never found an efficient algorithm for solving those problems, so no one is sure if it is possible\n- If there is an efficient algorithm for one of them, there is for all of them\n- Most of them are similar to problems we know the efficient solution, and it is interesting to see how small changes in the problem require changes in the solution\n\n## Week 2\n\n## Divide and Conquer algorithms\n\n- Idea is to divide problems in smaller sub parts and recursively solve them, then merge the sub-problems solutions into the final problem solution\n\n## MergeSort\n\n- Sorting using divide-and conquer method\n- Steps\n- Divide  Divide input into 2 halves consecutively until having lists with 1 item\n- Recur  Sort the two halves\n- Conquer  Put the elements back by merge sorting the lists together\n\n## Master method\n\n- The recurrence relation can be represented as\n\n<!-- formula-not-decoded -->\n\n- The master method\n- Theorem Suppose that T(n) and f(n) satisfy the recurrence relation defined previously (for some constants a, b, $ , and d) Then If there is a constant € &amp;gt; 0 such that f(n) is O(nlog ) If there is a constant logk /1 n) If there are constants € &amp;gt; 0 and $ &amp;lt; 1 such that f(n) is 0(f(n)). k &amp;gt;\n\n## Week 3\n\n## Binary Search\n\n- Find element in a sorted array\n- Get midpoint of array and check if desired element is greater or smaller it, cut list in half accordingly\n\n## Trees\n\n- Each node except root has a parent and possibly children\n- Nodes with no children are called leaf nodes\n- A binary tree is a tree where each node has at most 2 children\n\n- Binary search tree\n- A binary tree which every left subtree of a node is smaller than it, and every right subtree is greater than it\n\n## Priority queue\n\n- A container of elements each with an associated key\n- Keys determine priority in picking elements to be removed\n- Heap is a kind of PQ, allows insertions and deletions in log time"
// }


// QUIZZES
// {
//     "_id": { "$oid": "67d8c1ec81e5d16e5066cb56" },
//     "module_id": {
//     "$oid": "67c6fac1fe6c7457202ed9ba"
// },
//     "title": "Python Data Types Quiz",
//     "questions": [
//     {
//         "question": "Which of the following is not a Python data type?",
//         "options": [
//             "Integer",
//             "Float",
//             "Character",
//             "Boolean"
//         ],
//         "correct_answer": "Character"
//     },
//     {
//         "question": "What will print(type(10.5)) return?",
//         "options": [
//             "<class 'int'>",
//             "<class 'float'>",
//             "<class 'str'>",
//             "<class 'bool'>"
//         ],
//         "correct_answer": "<class 'float'>"
//     }
// ],
//     "created_at": {
//     "$date": { "$numberLong": "1741093569733" }
// },
//     "last_updated": {
//     "$date": { "$numberLong": "1741093569733" }
// }
// }


// USERS
// {
//     "_id": { "$oid": "67d8c21f81e5d16e5066cb57" },
//     "username": "Tony",
//     "email": "tonystark@yahoo.com",
//     "password_hash": {
//     "$binary": {
//         "base64": "JDJiJDEyJE9YT1cveUloRjBUelQ4UHRmLm9mQ2VVQmQya2kuckk2ZWtsY1A3WXZTeUhyM2lNem1jVUVX",
//             "subType": "00"
//     }
// },
//     "first_name": "Tony",
//     "last_name": "Stark",
//     "created_at": {
//     "$date": { "$numberLong": "1741300311888" }
// },
//     "last_login": {
//     "$date": { "$numberLong": "1741342493234" }
// },
//     "is_admin": false,
//     "is_active": true,
//     "is_verified": false,
//     "verification_token": "604c23ce-05a4-44ca-84e2-963aa4a33b50",
//     "verification_token_expiry": {
//     "$numberDouble": "1741386711.888847"
// },
//     "profile": {
//     "avatar": null,
//         "bio": null,
//         "education_level": null,
//         "subjects": []
// },
//     "preferences": {
//     "theme": "light",
//         "notification_email": true,
//         "language": "en",
//         "study_reminder": false
// },
//     "study_stats": {
//     "total_study_time": { "$numberInt": "0" },
//     "quizzes_completed": { "$numberInt": "0" },
//     "flashcards_reviewed": { "$numberInt": "0" },
//     "last_activity": {
//         "$date": { "$numberLong": "1741342493234" }
//     }
// },
//     "security": {
//     "password_reset_token": null,
//         "password_reset_expiry": null,
//         "failed_login_attempts": {
//         "$numberInt": "0"
//     },
//     "last_password_change": {
//         "$date": { "$numberLong": "1741300311888" }
//     }
// }
// }


// VIDEO CHAPTERS
// {
//     "_id": { "$oid": "67d8c24981e5d16e5066cb58" },
//     "module_id": {
//     "$oid": "67c6fac1fe6c7457202ed9ba"
// },
//     "title": "Introduction to Variables",
//     "video_url": "https://www.youtube.com/watch?v=example",
//     "start_time": { "$numberInt": "120" },
//     "end_time": { "$numberInt": "240" },
//     "transcript": "In this section, we'll learn about variables in Python...",
//     "created_at": {
//     "$date": { "$numberLong": "1741093569815" }
// },
//     "last_updated": {
//     "$date": { "$numberLong": "1741093569815" }
// }
// }