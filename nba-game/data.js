// ============================================================
// NameDrop - Multi-Category Database
// ============================================================

const CATEGORIES = {

  // ==================== NBA PLAYERS ====================
  nba: {
    name: "NBA Players",
    icon: "\u{1F3C0}",
    theme: "theme-nba",
    placeholder: "Enter NBA player name...",
    description: "Legends & current stars of the hardwood",
    entries: [
      "Kareem Abdul-Jabbar","Mahmoud Abdul-Rauf","Shareef Abdur-Rahim","Steven Adams",
      "Bam Adebayo","LaMarcus Aldridge","Ray Allen","Tony Allen","Giannis Antetokounmpo",
      "Carmelo Anthony","OG Anunoby","Gilbert Arenas","Trevor Ariza","Ron Artest",
      "Deandre Ayton","Charles Barkley","Rick Barry","Elgin Baylor","Bradley Beal",
      "Eric Bledsoe","Bojan Bogdanovic","Chris Bosh","Lonzo Ball","LaMelo Ball",
      "Larry Bird","Mookie Blaylock","Carlos Boozer","Chris Boucher","Bruce Bowen",
      "Avery Bradley","Malcolm Brogdon","Mikal Bridges","Miles Bridges","Jaylen Brown",
      "Kobe Bryant","Reggie Bullock","Jimmy Butler","Will Barton","Clint Capela",
      "Vince Carter","Michael Carter-Williams","Wilt Chamberlain","Tyson Chandler",
      "Jordan Clarkson","Mike Conley","Pat Connaughton","John Collins","Zach Collins",
      "DeMarcus Cousins","Robert Covington","Jamal Crawford","Jae Crowder","Seth Curry",
      "Stephen Curry","Cade Cunningham","Anthony Davis","Baron Davis","DeMar DeRozan",
      "Luol Deng","Spencer Dinwiddie","Luka Doncic","Goran Dragic","Andre Drummond",
      "Tim Duncan","Kevin Durant","Matthew Dellavedova","Donte DiVincenzo","Luguentz Dort",
      "Joe Dumars","Bob Dandridge","Adrian Dantley","Joel Embiid","Wayne Ellington",
      "Monta Ellis","Julius Erving","Patrick Ewing","Tyreke Evans","Alex English",
      "Dante Exum","Sean Elliott","De'Aaron Fox","Evan Fournier","Michael Finley",
      "Derek Fisher","Raymond Felton","Kenneth Faried","Markelle Fultz","Steve Francis",
      "Walt Frazier","Channing Frye","Kevin Garnett","Paul George","Pau Gasol",
      "Marc Gasol","Rudy Gay","Draymond Green","Danny Green","Aaron Gordon",
      "Eric Gordon","Drew Gooden","Rudy Gobert","Manu Ginobili","Taj Gibson",
      "Danilo Gallinari","Horace Grant","Hal Greer","George Gervin",
      "James Harden","Tim Hardaway","Tobias Harris","Gordon Hayward","Tyler Herro",
      "Buddy Hield","Grant Hill","George Hill","Allan Houston","Dwight Howard",
      "Al Horford","Robert Horry","Ron Harper","Josh Hart","Udonis Haslem",
      "Elvin Hayes","Richard Hamilton","Roy Hibbert","Jrue Holiday",
      "Richaun Holmes","Al Harrington","Montrezl Harrell","Devin Harris",
      "Kyrie Irving","Brandon Ingram","Andre Iguodala","Ersan Ilyasova","Joe Ingles",
      "Jonathan Isaac","Allen Iverson","Zydrunas Ilgauskas","Dan Issel",
      "LeBron James","Magic Johnson","Dennis Johnson","Joe Johnson","Richard Jefferson",
      "Brandon Jennings","Stephen Jackson","Reggie Jackson","Mark Jackson",
      "Josh Jackson","Jaren Jackson Jr.","Al Jefferson","Antawn Jamison","Eddie Johnson",
      "Larry Johnson","Kevin Johnson","Amir Johnson","Michael Jordan","DeAndre Jordan",
      "Nikola Jokic","Kyle Korver","Enes Kanter","Michael Kidd-Gilchrist",
      "Brandon Knight","Kyle Kuzma","Jason Kidd","Andrei Kirilenko","Bernard King",
      "Jonathan Kuminga","Toni Kukoc","Corey Kispert","Shawn Kemp","Steve Kerr",
      "Maxi Kleber","Kawhi Leonard","Damian Lillard","Kyle Lowry","Brook Lopez",
      "Robin Lopez","Kevin Love","Zach LaVine","Jeremy Lamb","Ty Lawson",
      "David Lee","Damion Lee","Alex Len","Rashard Lewis","Jeremy Lin",
      "Shaun Livingston","Kevon Looney","Fat Lever","Bob Love","Jerry Lucas",
      "Karl Malone","Moses Malone","Shawn Marion","Stephon Marbury","Ja Morant",
      "Tracy McGrady","Donovan Mitchell","Khris Middleton","Paul Millsap",
      "Mike Miller","Andre Miller","Marcus Morris","Markieff Morris",
      "Monte Morris","Malik Monk","Pete Maravich","Kenyon Martin","Kevin Martin",
      "Wesley Matthews","JaVale McGee","CJ McCollum","Doug McDermott",
      "Ben McLemore","Patty Mills","Nikola Mirotic","Dejounte Murray","Jamal Murray",
      "Steve Nash","Larry Nance Jr.","Shabazz Napier","Jameer Nelson",
      "Nerlens Noel","Dirk Nowitzki","Joakim Noah","Georges Niang",
      "Victor Oladipo","Kelly Oubre Jr.","Lamar Odom","Hakeem Olajuwon",
      "Shaquille O'Neal","Emeka Okafor","Jahlil Okafor","Isaac Okoro",
      "Chris Paul","Tony Parker","Gary Payton","Paul Pierce","Scottie Pippen",
      "Kristaps Porzingis","Otto Porter Jr.","Bobby Portis","Michael Porter Jr.",
      "Dwight Powell","Norman Powell","Jabari Parker","Elfrid Payton",
      "Mason Plumlee","Jakob Poeltl","Terry Porter","Immanuel Quickley",
      "J.J. Redick","Cam Reddish","Austin Rivers","Nate Robinson","Duncan Robinson",
      "Mitchell Robinson","Rajon Rondo","Derrick Rose","Terry Rozier","Brandon Roy",
      "Michael Redd","Willis Reed","Glen Rice","Jason Richardson","Oscar Robertson",
      "David Robinson","Dennis Rodman","Bill Russell","D'Angelo Russell",
      "Isaiah Rider","Doc Rivers","Jalen Rose","Domantas Sabonis","John Stockton",
      "Ben Simmons","Pascal Siakam","Josh Smith","J.R. Smith","Marcus Smart",
      "Dennis Schroder","Collin Sexton","Lance Stephenson",
      "Amar'e Stoudemire","Peja Stojakovic","Jerry Stackhouse","John Starks",
      "Jayson Tatum","Jeff Teague","Klay Thompson","Tristan Thompson",
      "Karl-Anthony Towns","P.J. Tucker","Evan Turner","Jason Terry",
      "Isaiah Thomas","Isiah Thomas","David Thompson","Gary Trent Jr.",
      "Garrett Temple","Daniel Theis","Ekpe Udoh","Beno Udrih","Wes Unseld",
      "Jonas Valanciunas","Fred VanVleet","Anderson Varejao","Nikola Vucevic",
      "Nick Van Exel","Keith Van Horn","Sasha Vujacic",
      "Russell Westbrook","John Wall","Kemba Walker","Ben Wallace","Rasheed Wallace",
      "T.J. Warren","Dwyane Wade","Jerry West","Dominique Wilkins","Andrew Wiggins",
      "Lou Williams","Deron Williams","James Worthy","Christian Wood",
      "Robert Williams III","Marvin Williams","Derrick White","Hassan Whiteside",
      "Antoine Walker","Bill Walton","Chris Webber","Lonnie Walker IV",
      "Xavier McDaniel","Xavier Tillman",
      "Trae Young","Thaddeus Young","Nick Young","Yao Ming","George Yardley","Yogi Ferrell",
      "Zach LaVine","Zion Williamson","Zaza Pachulia","Ivica Zubac"
    ]
  },

  // ==================== NFL PLAYERS ====================
  nfl: {
    name: "NFL Players",
    icon: "\u{1F3C8}",
    theme: "theme-nfl",
    placeholder: "Enter NFL player name...",
    description: "Gridiron greats from past and present",
    entries: [
      "Troy Aikman","Marcus Allen","Josh Allen","Kyle Allen","Keenan Allen",
      "Davante Adams","Jamal Adams","Matt Ryan","Aaron Rodgers","Antonio Brown",
      "Tom Brady","Drew Brees","John Elway","Brett Favre","Dan Marino",
      "Joe Montana","Peyton Manning","Eli Manning","Patrick Mahomes","Lamar Jackson",
      "Russell Wilson","Cam Newton","Dak Prescott","Deshaun Watson","Justin Herbert",
      "Joe Burrow","Trevor Lawrence","Tua Tagovailoa","Jalen Hurts","Justin Fields",
      "Derrick Henry","Adrian Peterson","Walter Payton","Barry Sanders","Emmitt Smith",
      "Jim Brown","Eric Dickerson","LaDainian Tomlinson","Marshawn Lynch","Ezekiel Elliott",
      "Saquon Barkley","Dalvin Cook","Alvin Kamara","Nick Chubb","Christian McCaffrey",
      "Jonathan Taylor","Najee Harris","Jerry Rice","Randy Moss","Terrell Owens",
      "Calvin Johnson","Larry Fitzgerald","Julio Jones","DeAndre Hopkins","Tyreek Hill",
      "Davante Adams","Stefon Diggs","Justin Jefferson","Ja'Marr Chase","CeeDee Lamb",
      "Cooper Kupp","Michael Thomas","Mike Evans","Chris Godwin","DK Metcalf",
      "Travis Kelce","Rob Gronkowski","Tony Gonzalez","Shannon Sharpe","George Kittle",
      "Mark Andrews","Darren Waller","Kyle Pitts","Aaron Donald","J.J. Watt",
      "Reggie White","Lawrence Taylor","Ray Lewis","Dick Butkus","Mike Singletary",
      "Bobby Wagner","Fred Warner","Micah Parsons","T.J. Watt","Nick Bosa",
      "Joey Bosa","Myles Garrett","Khalil Mack","Von Miller","Chandler Jones",
      "Jalen Ramsey","Richard Sherman","Darrelle Revis","Deion Sanders","Rod Woodson",
      "Ed Reed","Troy Polamalu","Brian Dawkins","Tyrann Mathieu","Minkah Fitzpatrick",
      "Sauce Gardner","Derek Carr","Kirk Cousins","Matthew Stafford","Jimmy Garoppolo",
      "Geno Smith","Daniel Jones","Mac Jones","Bryce Young","CJ Stroud",
      "Terry Bradshaw","Roger Staubach","Steve Young","Dan Fouts","Warren Moon",
      "Johnny Unitas","Joe Namath","Fran Tarkenton","Troy Polamalu","Charles Woodson",
      "Ronnie Lott","Mike Alstott","Franco Harris","Thurman Thomas","Tony Dorsett",
      "Gale Sayers","Red Grange","Ray Nitschke","Jack Lambert","Joe Greene",
      "Deacon Jones","Merlin Olsen","Bruce Smith","Michael Strahan","Jason Taylor",
      "DeMarcus Ware","Julius Peppers","Derrick Thomas","Dwight Freeney","Robert Mathis",
      "Randy White","Bob Lilly","Alan Page","Carl Eller","Howie Long","John Randle",
      "Warren Sapp","Cortez Kennedy","Dan Hampton","Art Donovan",
      "Jim Thorpe","Don Hutson","Sammy Baugh","Otto Graham","Bart Starr",
      "Trent Williams","Tyron Smith","Jason Kelce","Zack Martin","Quenton Nelson"
    ]
  },

  // ==================== US PRESIDENTS ====================
  presidents: {
    name: "Presidents",
    icon: "\u{1F3DB}\uFE0F",
    theme: "theme-presidents",
    placeholder: "Enter a US President's name...",
    description: "All 46 leaders of the United States",
    entries: [
      "George Washington","John Adams","Thomas Jefferson","James Madison",
      "James Monroe","John Quincy Adams","Andrew Jackson","Martin Van Buren",
      "William Henry Harrison","John Tyler","James K. Polk","Zachary Taylor",
      "Millard Fillmore","Franklin Pierce","James Buchanan","Abraham Lincoln",
      "Andrew Johnson","Ulysses S. Grant","Rutherford B. Hayes","James A. Garfield",
      "Chester A. Arthur","Grover Cleveland","Benjamin Harrison","William McKinley",
      "Theodore Roosevelt","William Howard Taft","Woodrow Wilson","Warren G. Harding",
      "Calvin Coolidge","Herbert Hoover","Franklin D. Roosevelt","Harry S. Truman",
      "Dwight D. Eisenhower","John F. Kennedy","Lyndon B. Johnson","Richard Nixon",
      "Gerald Ford","Jimmy Carter","Ronald Reagan","George H.W. Bush",
      "Bill Clinton","George W. Bush","Barack Obama","Donald Trump","Joe Biden"
    ]
  },

  // ==================== CELEBRITIES ====================
  celebrities: {
    name: "Celebrities",
    icon: "\u2B50",
    theme: "theme-celebrities",
    placeholder: "Enter a celebrity name...",
    description: "Famous faces from music, TV, film & more",
    entries: [
      // Music
      "Taylor Swift","Beyonce Knowles","Drake Graham","Kanye West","Rihanna Fenty",
      "Ed Sheeran","Adele Adkins","Justin Bieber","Ariana Grande","Post Malone",
      "Billie Eilish","Dua Lipa","Harry Styles","Bruno Mars","Lady Gaga",
      "Jay-Z Carter","Eminem Mathers","Kendrick Lamar","Travis Scott","Nicki Minaj",
      "Miley Cyrus","Selena Gomez","Demi Lovato","Katy Perry","Pink Moore",
      "John Legend","Alicia Keys","Sam Smith","Lizzo Jefferson","Cardi B",
      "Bad Bunny","Shakira Ripoll","Jennifer Lopez","Madonna Ciccone","Cher Sarkisian",
      "Elvis Presley","Michael Jackson","Prince Nelson","Whitney Houston","Freddie Mercury",
      "David Bowie","John Lennon","Paul McCartney","Mick Jagger","Bob Dylan",
      "Stevie Wonder","Elton John","Frank Sinatra","Mariah Carey","Celine Dion",
      "Usher Raymond","Chris Brown","The Weeknd","SZA Rowe","Tyler Creator",
      "Doja Cat","Olivia Rodrigo","Sabrina Carpenter","Lana Del Rey","Jack Harlow",

      // Actors / TV
      "Leonardo DiCaprio","Brad Pitt","Angelina Jolie","Tom Hanks","Denzel Washington",
      "Morgan Freeman","Robert De Niro","Al Pacino","Johnny Depp","Will Smith",
      "Dwayne Johnson","Chris Hemsworth","Chris Evans","Chris Pratt","Robert Downey Jr.",
      "Scarlett Johansson","Jennifer Lawrence","Emma Stone","Margot Robbie","Zendaya Coleman",
      "Tom Holland","Timothee Chalamet","Florence Pugh","Ana de Armas","Sydney Sweeney",
      "Jennifer Aniston","Sandra Bullock","Julia Roberts","Meryl Streep","Cate Blanchett",
      "Nicole Kidman","Charlize Theron","Matt Damon","Ben Affleck","Ryan Gosling",
      "Ryan Reynolds","Jake Gyllenhaal","Joaquin Phoenix","Christian Bale","Benedict Cumberbatch",
      "Tom Cruise","Harrison Ford","Samuel L. Jackson","Bruce Willis","Arnold Schwarzenegger",
      "Sylvester Stallone","Keanu Reeves","Jeff Goldblum","Bill Murray","Robin Williams",
      "Jim Carrey","Adam Sandler","Eddie Murphy","Steve Martin","Kevin Hart",
      "Oprah Winfrey","Ellen DeGeneres","Jimmy Fallon","Jimmy Kimmel","Conan O'Brien",
      "Stephen Colbert","Trevor Noah","Dave Chappelle","Joe Rogan","Pete Davidson",

      // Social Media / Influencers
      "Kim Kardashian","Kylie Jenner","Kendall Jenner","Khloe Kardashian","Kourtney Kardashian",
      "David Beckham","Cristiano Ronaldo","Lionel Messi","Serena Williams","Venus Williams",
      "Roger Federer","Rafael Nadal","Tiger Woods","Michael Phelps","Simone Biles",
      "Elon Musk","Jeff Bezos","Mark Zuckerberg","Bill Gates","Steve Jobs",
      "Gordon Ramsay","Martha Stewart","Guy Fieri","Bear Grylls","Anthony Bourdain",
      "Paris Hilton","Nicole Richie","Hailey Bieber","Gigi Hadid","Bella Hadid",
      "Naomi Campbell","Tyra Banks","Heidi Klum","Kate Moss","Cara Delevingne"
    ]
  },

  // ==================== MOVIES (Characters) ====================
  movies: {
    name: "Movie Characters",
    icon: "\u{1F3AC}",
    theme: "theme-movies",
    placeholder: "Enter a movie character name...",
    description: "Iconic characters from film history",
    entries: [
      // Action / Sci-Fi
      "Luke Skywalker","Han Solo","Darth Vader","Princess Leia","Obi-Wan Kenobi",
      "Anakin Skywalker","Yoda Master","Rey Skywalker","Kylo Ren","Din Djarin",
      "James Bond","Jason Bourne","Ethan Hunt","John Wick","John McClane",
      "Sarah Connor","Ellen Ripley","Neo Anderson","Trinity Matrix","Morpheus Fishburne",
      "Tony Stark","Steve Rogers","Thor Odinson","Bruce Banner","Natasha Romanoff",
      "Peter Parker","Wanda Maximoff","Stephen Strange","Carol Danvers","Scott Lang",
      "Frodo Baggins","Gandalf Grey","Aragorn Elessar","Legolas Greenleaf","Samwise Gamgee",
      "Harry Potter","Hermione Granger","Ron Weasley","Albus Dumbledore","Severus Snape",
      "Draco Malfoy","Sirius Black","Remus Lupin","Neville Longbottom","Rubeus Hagrid",
      "Katniss Everdeen","Peeta Mellark","Finnick Odair","Maximus Decimus","Spartacus Thracian",

      // Drama / Classic
      "Forrest Gump","Andy Dufresne","Michael Corleone","Vito Corleone","Tony Montana",
      "Rick Blaine","Scarlett O'Hara","Rhett Butler","Atticus Finch","Norman Bates",
      "Hannibal Lecter","Clarice Starling","Patrick Bateman","Tyler Durden","Walter White",
      "Jack Torrance","Danny Torrance","Annie Wilkes","Travis Bickle","Don Draper",
      "Rocky Balboa","Daniel LaRusso","Marty McFly","Doc Brown","Indiana Jones",

      // Animation (non-Disney, or live-action family)
      "Shrek Ogre","Donkey Shrek","Puss Boots","Hiccup Haddock","Po Dragon Warrior",
      "Buzz Lightyear","Woody Sheriff","Nemo Fish","Dory Blue","Remy Ratatouille",
      "Carl Fredricksen","Joy Inside","Sadness Inside","Miguel Rivera","Lightning McQueen",

      // Comedy / Romance
      "Elle Woods","Bridget Jones","Derek Zoolander","Ron Burgundy","Austin Powers",
      "Ferris Bueller","Napoleon Dynamite","Ted Lasso","Borat Sagdiyev","Ace Ventura",
      "Jack Sparrow","Willy Wonka","Edward Scissorhands","Beetlejuice Demon","Shawshank Red",

      // Horror / Thriller
      "Freddy Krueger","Jason Voorhees","Michael Myers","Pennywise Clown","Ghostface Killer",
      "Jigsaw Kramer","Leatherface Sawyer","Chucky Doll","Samara Morgan","Sadako Yamamura",

      // Modern
      "Dominic Toretto","Brian O'Conner","John Rambo","Lara Croft","Batman Wayne",
      "Superman Kent","Wonder Woman","Joker Clown","Bane Villain","Catwoman Kyle",
      "Black Panther","Killmonger Stevens","Thanos Titan","Loki Laufeyson","Gamora Zen"
    ]
  },

  // ==================== DISNEY CHARACTERS ====================
  disney: {
    name: "Disney Characters",
    icon: "\u{1F3F0}",
    theme: "theme-disney",
    placeholder: "Enter a Disney character name...",
    description: "Beloved characters from the House of Mouse",
    entries: [
      // Classic Disney
      "Mickey Mouse","Minnie Mouse","Donald Duck","Daisy Duck","Goofy Dog",
      "Pluto Dog","Scrooge McDuck","Huey Duck","Dewey Duck","Louie Duck",
      "Chip Dale","Winnie Pooh","Tigger Cat","Piglet Pig","Eeyore Donkey",

      // Princesses & Princes
      "Snow White","Cinderella Prince","Aurora Beauty","Ariel Mermaid","Belle Beauty",
      "Jasmine Aladdin","Pocahontas Chief","Mulan Warrior","Tiana Princess","Rapunzel Tower",
      "Merida Brave","Moana Waialiki","Mirabel Madrigal","Raya Dragon","Elsa Frozen",
      "Anna Frozen","Prince Eric","Prince Charming","Prince Naveen","Flynn Rider",
      "Kristoff Mountain","Hans Southern","Aladdin Street","Li Shang",

      // Heroes & Sidekicks
      "Simba Lion","Nala Lion","Mufasa King","Timon Meerkat","Pumbaa Warthog",
      "Bambi Deer","Thumper Rabbit","Dumbo Elephant","Pinocchio Puppet","Jiminy Cricket",
      "Peter Pan","Tinker Bell","Wendy Darling","Captain Hook","Robin Hood",
      "Mowgli Boy","Baloo Bear","Tarzan Ape","Quasimodo Bell","Esmeralda Gypsy",
      "Hercules Zeus","Stitch Alien","Lilo Pelekai","Wreck Ralph","Vanellope Schweetz",
      "Baymax Robot","Hiro Hamada","Judy Hopps","Nick Wilde","Maui Demigod",

      // Villains
      "Maleficent Fairy","Ursula Sea","Gaston Hunter","Jafar Sorcerer","Scar Lion",
      "Cruella De Vil","Captain Hook","Hades God","Queen Grimhilde","Lady Tremaine",
      "Mother Gothel","Hans Southern","Yzma Emperor","Doctor Facilier","Syndrome Buddy",
      "Lotso Bear","Ernesto De La Cruz","Tamatoa Crab",

      // Pixar
      "Woody Sheriff","Buzz Lightyear","Jessie Cowgirl","Rex Dinosaur","Hamm Piggybank",
      "Slinky Dog","Forky Toy","Bo Peep","Nemo Fish","Dory Blue","Marlin Fish",
      "Remy Ratatouille","Linguini Chef","Carl Fredricksen","Russell Scout",
      "Joy Emotion","Sadness Emotion","Anger Emotion","Fear Emotion","Disgust Emotion",
      "Miguel Rivera","Hector Rivera","Lightning McQueen","Mater Truck","Sally Carrera",
      "Mike Wazowski","Sulley Monster","Boo Child","Randall Boggs","Merida Brave",
      "Wall-E Robot","Eve Robot","Arlo Dinosaur","Ian Lightfoot","Barley Lightfoot",
      "Luca Paguro","Alberto Scorfano","Luisa Madrigal","Bruno Madrigal","Isabela Madrigal",

      // Frozen
      "Olaf Snowman","Sven Reindeer","Elsa Queen","Anna Princess","Kristoff Ice",
      "Marshmallow Snow",

      // Recent / Other
      "Moana Waialiki","Maui Hook","Raya Warrior","Sisu Dragon","Genie Lamp",
      "Abu Monkey","Iago Parrot","Mushu Dragon","Pascal Chameleon","Maximus Horse",
      "Sebastian Crab","Flounder Fish","Lumiere Candle","Cogsworth Clock","Chip Cup"
    ]
  }
};

// Helper: get deduplicated list for a category
function getCategoryEntries(categoryKey) {
  const cat = CATEGORIES[categoryKey];
  if (!cat) return [];
  return [...new Set(cat.entries)];
}
