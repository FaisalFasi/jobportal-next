// CREATE TABLE jobSeekerProfile (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     userId INTEGER NOT NULL,
//     name TEXT NOT NULL,
//     avatar TEXT NOT NULL,
//     bio TEXT,
//     yearsExperience INTEGER,
//     onlineStatus INTEGER NOT NULL, // 0 = offline, 1 = online, 2 = away, 3 = invisible
//     status INTEGER NOT NULL, // 0 = seeking, 1 = foundAJob, 2 = notSeeking
//     lastOnline INTEGER NOT NULL,
//     FOREIGN KEY (userId) REFERENCES user(id)
// );

// CREATE TABLE recruiterProfile (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     userId INTEGER NOT NULL,
//     name TEXT NOT NULL,
//     avatar TEXT NOT NULL,
//     bio TEXT,
//     onlineStatus INTEGER NOT NULL, // 0 = offline, 1 = online, 2 = away, 3 = invisible
//     lastOnline INTEGER NOT NULL,
//     FOREIGN KEY (userId) REFERENCES user(id)
// );
