USE calcutta;

INSERT INTO `regions` (`year`, `region_code`, `region_name`)
VALUES
  (2019, 'W', 'East'),
  (2019, 'X', 'West'),
  (2019, 'Y', 'Midwest'),
  (2019, 'Z', 'South');

INSERT INTO `teams` (`team_name`, `team_conference`)
VALUES
  ();

INSERT INTO `tournament_slots` (`round_id`, `game_id`, `seed_strong`, `seed_weak`)
VALUES
  (1, 'W1', 'W01', 'W16'),
  (1, 'W2', 'W02', 'W15'),
  (1, 'W3', 'W03', 'W14'),
  (1, 'W4', 'W04', 'W13'),
  (1, 'W5', 'W05', 'W12'),
  (1, 'W6', 'W06', 'W11'),
  (1, 'W7', 'W07', 'W10'),
  (1, 'W8', 'W08', 'W09'),
  (1, 'X1', 'X01', 'W16'),
  (1, 'X2', 'X02', 'X15'),
  (1, 'X3', 'X03', 'X14'),
  (1, 'X4', 'X04', 'X13'),
  (1, 'X5', 'X05', 'X12'),
  (1, 'X6', 'X06', 'X11'),
  (1, 'X7', 'X07', 'X10'),
  (1, 'X8', 'X08', 'X09'),
  (1, 'Y1', 'Y01', 'Y16'),
  (1, 'Y2', 'Y02', 'Y15'),
  (1, 'Y3', 'Y03', 'Y14'),
  (1, 'Y4', 'Y04', 'Y13'),
  (1, 'Y5', 'Y05', 'Y12'),
  (1, 'Y6', 'Y06', 'Y11'),
  (1, 'Y7', 'Y07', 'Y10'),
  (1, 'Y8', 'Y08', 'Y09'),
  (1, 'Z1', 'Z01', 'Z16'),
  (1, 'Z2', 'Z02', 'Z15'),
  (1, 'Z3', 'Z03', 'Z14'),
  (1, 'Z4', 'Z04', 'Z13'),
  (1, 'Z5', 'Z05', 'Z12'),
  (1, 'Z6', 'Z06', 'Z11'),
  (1, 'Z7', 'Z07', 'Z10'),
  (1, 'Z8', 'Z08', 'Z09'),
  (2, 'W1', 'R1W1', 'R1W8'),
  (2, 'W2', 'R1W2', 'R1W7'),
  (2, 'W3', 'R1W3', 'R1W6'),
  (2, 'W4', 'R1W4', 'R1W5'),
  (2, 'X1', 'R1X1', 'R1X8'),
  (2, 'X2', 'R1X2', 'R1X7'),
  (2, 'X3', 'R1X3', 'R1X6'),
  (2, 'X4', 'R1X4', 'R1X5'),
  (2, 'Y1', 'R1Y1', 'R1Y8'),
  (2, 'Y2', 'R1Y2', 'R1Y7'),
  (2, 'Y3', 'R1Y3', 'R1Y6'),
  (2, 'Y4', 'R1Y4', 'R1Y5'),
  (2, 'Z1', 'R1Z1', 'R1Z8'),
  (2, 'Z2', 'R1Z2', 'R1Z7'),
  (2, 'Z3', 'R1Z3', 'R1Z6'),
  (2, 'Z4', 'R1Z4', 'R1Z5'),
  (3, 'W1', 'R2W1', 'R2W4'),
  (3, 'W2', 'R2W2', 'R2W3'),
  (3, 'X1', 'R2X1', 'R2X4'),
  (3, 'X2', 'R2X2', 'R2X3'),
  (3, 'Y1', 'R2Y1', 'R2Y4'),
  (3, 'Y2', 'R2Y2', 'R2Y3'),
  (3, 'Z1', 'R2Z1', 'R2Z4'),
  (3, 'Z2', 'R2Z2', 'R2Z3'),
  (4, 'W1', 'R3W1', 'R3W2'),
  (4, 'X1', 'R3X1', 'R3X2'),
  (4, 'Y1', 'R3Y1', 'R3Y2'),
  (4, 'Z1', 'R3Z1', 'R3Z2'),
  (5, 'WX', 'R4W1', 'R4X1'),
  (5, 'YZ', 'R4Y1', 'R4Z1'),
  (6, 'CH', 'R5WX', 'R5YZ');