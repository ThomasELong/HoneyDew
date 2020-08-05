SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
([id], [firstName], [lastName], [firebaseUserId], [email])
VALUES
(1, 'Thomas', 'Long', '8qAEySQNG8ay20ZFqogQpfXyeA42', 'thomas@nss.com'),
(2, 'John', 'Rosenbalm', 'Df6h8fjhabO7yQeATCbjOyFqLv83', 'j@me.com')
SET IDENTITY_INSERT [UserProfile] OFF


SET IDENTITY_INSERT [Project] ON
INSERT INTO [Project]
([id], [name], [projectNote], [createdDate], [userProfileId])
VALUES
(1, 'Full Remodel!', 'This is going to take a long time, but my wife is excited about what it will look like. Do a good job!', '2019-09-05', 1),
(2, 'Kitchen Upgrade', 'New cabinets, tile floor, paint, and lighting', '2019-01-14', 1),
(3, 'Stain back deck', 'Reseat all nails, sand rough portions, pressure wash everything, stain with Minwax Red Oak - $35 at Lowes with coupon', '2020-04-27', 2)
SET IDENTITY_INSERT [Project] OFF


SET IDENTITY_INSERT [Room] ON
INSERT INTO [Room]
([id], [name])
VALUES
(1, 'Entryway/Foyer'),
(2, 'Living Room'),
(3, 'Dining Room'),
(4, 'Kitchen'),
(5, 'Bathroom'),
(6, 'Bedroom'),
(7, 'Master Bedroom'),
(8, 'Hallway'),
(9, 'Bonus Room'),
(10, 'Office'),
(11, 'Den'),
(12, 'Loft'),
(13, 'Pantry'),
(14, 'Closet'),
(15, 'Deck/Porch'),
(16, 'Laundry Room'),
(17, 'Garage'),
(18, 'Attic'),
(19, 'Mudroom'),
(20, 'Outdoor'),
(21, 'General')
SET IDENTITY_INSERT [Room] OFF





SET IDENTITY_INSERT [TaskCategory] ON
INSERT INTO [TaskCategory]
([id], [type])
VALUES
(1, 'Electrical'),
(2, 'Plumbing - Water'),
(3, 'Plumbing - Gas'),
(4, 'Drywall/Plaster'),
(5, 'Paint'),
(6, 'Flooring'),
(7, 'Tile'),
(8, 'Trim & Finish Work'),
(9, 'Cabinets'),
(10, 'Doors & Windows'),
(11, 'Framing'),
(12, 'Insulation'),
(13, 'Roof'),
(14, 'Siding'),
(15, 'Foundation'),
(16, 'Masonry'),
(17, 'Outdoor'),
(18, 'Material Selection'),
(19, 'Demo'),
(20, 'Site Maintenance/Clean Up'),
(21, 'Miscellaneous')
SET IDENTITY_INSERT [TaskCategory] OFF


