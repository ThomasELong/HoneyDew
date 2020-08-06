SET IDENTITY_INSERT [Task] ON
INSERT INTO [Task]
([id], [projectId], [taskTitle], [taskPriority], [taskComplete], [taskCategoryId], [roomId])
VALUES
(1, 1, 'Install Backsplash', 4, 0, 7, 4),
(2, 2, 'Cabinet Measure', 2, 1, 9, 4),
(3, 3, 'Rent Sander and Pressure Washer', 3, 0, 17, 20)
SET IDENTITY_INSERT [Task] OFF


SET IDENTITY_INSERT [TaskNote] ON
INSERT INTO [TaskNote]
([id], [title], [content], [taskId], [createdDate])
VALUES
(1, 'Measure Area', 'Ask Lena where she wants to end the backsplash', 1, '2019-09-07'),
(2, 'Range Hood vs OTR', 'Compare prices between the two', 2, '2019-1-15'),
(3, 'High spot by gate', 'Noticed a high spot that will need extra sanding by the front gate', 3, '2020-04-27')
SET IDENTITY_INSERT [TaskNote] OFF