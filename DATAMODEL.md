User Table:

id (Primary Key),
username,
password,
email,
role (either 'jobseeker' or 'recruiter'),
other user-related fields.

This table stores information about all users, distinguishing between job seekers and recruiters based on the 'role' field.

Job Table:

id (Primary Key),
title,
description,
recruiter_id (Foreign Key to User Table),
salary
location
remote_possible
language_required

This table stores job postings created by recruiters. Each job is associated with the recruiter who posted it.

Message Table:

id (Primary Key),
sender_id (Foreign Key to User Table),
conversation_id (Foreign Key to Conversation Table),
receiver_id (Foreign Key to User Table),
message_content,
timestamp.

This table records messages sent between users. The 'sender_id' and 'receiver_id' fields link the message to the sender and receiver, who can be either job seekers or recruiters.

Conversation Table:

id (Primary Key),
user1_id (Foreign Key to User Table),
user2_id (Foreign Key to User Table).

Application Table:

id (Primary Key),
user_id (Foreign Key to User Table),
job_id (Foreign Key to Job Table),
status (e.g., 'pending', 'accepted', 'rejected').

// the same in the sql pg file

first we need to delete the database if it exists

DROP DATABASE IF EXISTS jobboard;

alternatively we can use the following command to delete all tables in the database

DROP TABLE IF EXISTS users, jobs, messages, conversations, applications;

/CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
role VARCHAR(50) NOT NULL,
other_user_related_fields VARCHAR(50) NOT NULL
);

CREATE TABLE jobs (
id SERIAL PRIMARY KEY,
title VARCHAR(50) NOT NULL,
description VARCHAR(50) NOT NULL,
recruiter_id INTEGER NOT NULL,
salary INTEGER NOT NULL,
location VARCHAR(50) NOT NULL,
remote_possible BOOLEAN NOT NULL,
language_required VARCHAR(50) NOT NULL
);

CREATE TABLE messages (
id SERIAL PRIMARY KEY,
sender_id INTEGER NOT NULL,
conversation_id INTEGER NOT NULL,
receiver_id INTEGER NOT NULL,
message_content VARCHAR(50) NOT NULL,
timestamp VARCHAR(50) NOT NULL
);

CREATE TABLE conversations (
id SERIAL PRIMARY KEY,
user1_id INTEGER NOT NULL,
user2_id INTEGER NOT NULL
);

CREATE TABLE applications (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL,
job_id INTEGER NOT NULL,
status VARCHAR(50) NOT NULL
);

testdlldwdlwdlqwdqwd#dwwq

# test data:

insert into users (id, username, password, email, role, other_user_related_fields) values (1111, 'user1', 'password1', ' email1', 'jobseeker', 'other_user_related_fields1');
insert into users (id, username, password, email, role, other_user_related_fields) values (2222, 'user2', 'password2', ' email2', 'jobseeker', 'other_user_related_fields2');
insert into users (id, username, password, email, role, other_user_related_fields) values (3333, 'user3', 'password3', ' email3', 'recruiter', 'other_user_related_fields3');

insert into jobs (title, description, recruiter_id, salary, location, remote_possible, language_required) values ('title1', 'description1', 1, 1000, 'location1', true, 'language_required1');
insert into jobs (title, description, recruiter_id, salary, location, remote_possible, language_required) values ('title2', 'description2', 2, 2000, 'location2', true, 'language_required2');
insert into jobs (title, description, recruiter_id, salary, location, remote_possible, language_required) values ('title3', 'description3', 3, 3000, 'location3', true, 'language_required3');

insert into conversations (user1_id, user2_id) values (1111, 3333);
insert into conversations (user1_id, user2_id) values (2222, 3333);

insert into messages (sender_id, conversation_id, receiver_id, message_content, timestamp) values (1111, 1, 3333, 'hi there from user 1', 'timestamp1');
insert into messages (sender_id, conversation_id, receiver_id, message_content, timestamp) values (2222, 2, 3333, 'hi there from user 2', 'timestamp2');

insert into applications (user_id, job_id, status) values (1111, 1, 'pending');dwdqwd
