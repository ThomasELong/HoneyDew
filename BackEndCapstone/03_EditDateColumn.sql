ALTER TABLE Project DROP COLUMN [timestamp]

ALTER TABLE Project ADD createdDate date

ALTER TABLE TaskNote DROP COLUMN [timestamp]

ALTER TABLE TaskNote ADD createdDate date