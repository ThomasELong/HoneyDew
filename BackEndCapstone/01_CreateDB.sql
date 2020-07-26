USE [master]
GO

IF db_id('BackEndCapstone') IS NULL
	CREATE DATABASE BackEndCapstone
GO

USE [BackEndCapstone]
GO

DROP TABLE IF EXISTS [UserProfile]
DROP TABLE IF EXISTS [Project]
DROP TABLE IF EXISTS [Room]
DROP TABLE IF EXISTS [TaskCategory]
DROP TABLE IF EXISTS [Task]
DROP TABLE IF EXISTS [TaskNote]


CREATE TABLE [UserProfile] (
  [id] int PRIMARY KEY NOT NULL,
  [firstName] nvarchar(40) NOT NULL,
  [lastName] nvarchar(40) NOT NULL,
  [firebaseUserId] nvarchar(255) NOT NULL

  CONSTRAINT UQ_fireBaseUserId UNIQUE(firebaseUserId)
)
GO

CREATE TABLE [Project] (
  [id] int PRIMARY KEY NOT NULL,
  [name] nvarchar(255) NOT NULL,
  [projectNote] nvarchar(max) NOT NULL,
  [timestamp] timestamp NOT NULL,
  [userProfileId] int NOT NULL

  CONSTRAINT FK_Project_User FOREIGN KEY (userProfileId) REFERENCES UserProfile(id)

)
GO

CREATE TABLE [Room] (
  [id] int PRIMARY KEY NOT NULL,
  [name] nvarchar(30) NOT NULL,
  [projectId] int NOT NULL

  CONSTRAINT FK_Room_Project FOREIGN KEY (projectId) REFERENCES Project(id)

)
GO

CREATE TABLE [TaskCategory] (
  [id] int PRIMARY KEY NOT NULL,
  [type] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Task] (
  [id] int PRIMARY KEY NOT NULL,
  [roomId] int NOT NULL,
  [taskTitle] nvarchar(75) NOT NULL,
  [taskPriority] int NOT NULL,
  [taskComplete] bit NOT NULL,
  [taskCategoryId] int NOT NULL

  CONSTRAINT FK_Task_TaskCategory FOREIGN KEY (taskCategoryId) REFERENCES TaskCategory(id),
  CONSTRAINT FK_Task_Room FOREIGN KEY (roomId) REFERENCES Room(id)

)
GO

CREATE TABLE [TaskNote] (
  [id] int PRIMARY KEY NOT NULL,
  [title] nvarchar(75) NOT NULL,
  [content] nvarchar(max) NOT NULL,
  [timestamp] timestamp NOT NULL,
  [taskId] int NOT NULL

  CONSTRAINT FK_TaskNote_Task FOREIGN KEY (taskId) REFERENCES Task(id)
)
GO