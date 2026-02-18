// Wordle-style anagram task: multiple items, multiple attempts, skip, global time limit

// 1) Configuration
const LETTERS_PER_WORD = 5;
const SKIP_DELAY_MS = 3000; // 3 seconds before Skip appears after first attempt

// Set to 15 minutes for real use; keep 1 minute for quick testing if you like
const TOTAL_TASK_MS = 1 * 60 * 1000; // 1 minute for testing

// 2) Stimuli (pasted from your CSVs via converter)
const STIMULI = {
  Easy: [
  { itemId: 1, scramble: "AYONG", solution: "AGONY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 2, scramble: "ABLUM", solution: "ALBUM", difficulty: "Easy", isUnsolvable: false },
  { itemId: 3, scramble: "ANKEL", solution: "ANKLE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 4, scramble: "ARPON", solution: "APRON", difficulty: "Easy", isUnsolvable: false },
  { itemId: 5, scramble: "BOANJ", solution: "BANJO", difficulty: "Easy", isUnsolvable: false },
  { itemId: 6, scramble: "BACHT", solution: "BATCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 7, scramble: "BOTAN", solution: "BATON", difficulty: "Easy", isUnsolvable: false },
  { itemId: 8, scramble: "BNCHE", solution: "BENCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 9, scramble: "BRTHE", solution: "BERTH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 10, scramble: "BTIGO", solution: "BIGOT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 11, scramble: "BRICH", solution: "BIRCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 12, scramble: "BICHT", solution: "BITCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 13, scramble: "BACLK", solution: "BLACK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 14, scramble: "BLDEA", solution: "BLADE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 15, scramble: "BLEAZ", solution: "BLAZE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 16, scramble: "BIMPL", solution: "BLIMP", difficulty: "Easy", isUnsolvable: false },
  { itemId: 17, scramble: "BOCLK", solution: "BLOCK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 18, scramble: "BRDAN", solution: "BRAND", difficulty: "Easy", isUnsolvable: false },
  { itemId: 19, scramble: "BRLAW", solution: "BRAWL", difficulty: "Easy", isUnsolvable: false },
  { itemId: 20, scramble: "BIRCK", solution: "BRICK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 21, scramble: "BERIN", solution: "BRINE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 22, scramble: "BIRNK", solution: "BRINK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 23, scramble: "BNCHU", solution: "BUNCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 24, scramble: "BUERY", solution: "BUYER", difficulty: "Easy", isUnsolvable: false },
  { itemId: 25, scramble: "CANIB", solution: "CABIN", difficulty: "Easy", isUnsolvable: false },
  { itemId: 26, scramble: "CEABL", solution: "CABLE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 27, scramble: "CARIN", solution: "CAIRN", difficulty: "Easy", isUnsolvable: false },
  { itemId: 28, scramble: "CHARI", solution: "CHAIR", difficulty: "Easy", isUnsolvable: false },
  { itemId: 29, scramble: "CHLAK", solution: "CHALK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 30, scramble: "CHIDL", solution: "CHILD", difficulty: "Easy", isUnsolvable: false },
  { itemId: 31, scramble: "CHEIM", solution: "CHIME", difficulty: "Easy", isUnsolvable: false },
  { itemId: 32, scramble: "CIMPH", solution: "CHIMP", difficulty: "Easy", isUnsolvable: false },
  { itemId: 33, scramble: "CHODR", solution: "CHORD", difficulty: "Easy", isUnsolvable: false },
  { itemId: 34, scramble: "CUMPH", solution: "CHUMP", difficulty: "Easy", isUnsolvable: false },
  { itemId: 35, scramble: "CHUKN", solution: "CHUNK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 36, scramble: "CAMPL", solution: "CLAMP", difficulty: "Easy", isUnsolvable: false },
  { itemId: 37, scramble: "CHASL", solution: "CLASH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 38, scramble: "CKERL", solution: "CLERK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 39, scramble: "COLAK", solution: "CLOAK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 40, scramble: "CLTHO", solution: "CLOTH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 41, scramble: "CLONW", solution: "CLOWN", difficulty: "Easy", isUnsolvable: false },
  { itemId: 42, scramble: "CORIG", solution: "CORGI", difficulty: "Easy", isUnsolvable: false },
  { itemId: 43, scramble: "CONTU", solution: "COUNT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 44, scramble: "CHOUG", solution: "COUGH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 45, scramble: "COREV", solution: "COVER", difficulty: "Easy", isUnsolvable: false },
  { itemId: 46, scramble: "CRTAF", solution: "CRAFT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 47, scramble: "CRMAP", solution: "CRAMP", difficulty: "Easy", isUnsolvable: false },
  { itemId: 48, scramble: "CARNK", solution: "CRANK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 49, scramble: "CREAZ", solution: "CRAZE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 50, scramble: "COFTR", solution: "CROFT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 51, scramble: "COWRD", solution: "CROWD", difficulty: "Easy", isUnsolvable: false },
  { itemId: 52, scramble: "CRMBU", solution: "CRUMB", difficulty: "Easy", isUnsolvable: false },
  { itemId: 53, scramble: "CHRUS", solution: "CRUSH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 54, scramble: "CRTYP", solution: "CRYPT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 55, scramble: "DOMEN", solution: "DEMON", difficulty: "Easy", isUnsolvable: false },
  { itemId: 56, scramble: "DEPHT", solution: "DEPTH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 57, scramble: "DOVIT", solution: "DIVOT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 58, scramble: "DOBUT", solution: "DOUBT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 59, scramble: "DRLAW", solution: "DRAWL", difficulty: "Easy", isUnsolvable: false },
  { itemId: 60, scramble: "DIRNK", solution: "DRINK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 61, scramble: "DURNK", solution: "DRUNK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 62, scramble: "DUNEC", solution: "DUNCE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 63, scramble: "ERNTY", solution: "ENTRY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 64, scramble: "FIRAY", solution: "FAIRY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 65, scramble: "FATHI", solution: "FAITH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 66, scramble: "FANYC", solution: "FANCY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 67, scramble: "FULAT", solution: "FAULT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 68, scramble: "FTIGH", solution: "FIGHT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 69, scramble: "FLITH", solution: "FILTH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 70, scramble: "FICHN", solution: "FINCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 71, scramble: "FLEAK", solution: "FLAKE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 72, scramble: "FLEAM", solution: "FLAME", difficulty: "Easy", isUnsolvable: false },
  { itemId: 73, scramble: "FLAKN", solution: "FLANK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 74, scramble: "FALSH", solution: "FLASH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 75, scramble: "FLAKS", solution: "FLASK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 76, scramble: "FTIRL", solution: "FLIRT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 77, scramble: "FULKE", solution: "FLUKE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 78, scramble: "FOREC", solution: "FORCE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 79, scramble: "FROUM", solution: "FORUM", difficulty: "Easy", isUnsolvable: false },
  { itemId: 80, scramble: "FOEAV", solution: "FOVEA", difficulty: "Easy", isUnsolvable: false },
  { itemId: 81, scramble: "FURAD", solution: "FRAUD", difficulty: "Easy", isUnsolvable: false },
  { itemId: 82, scramble: "FTRON", solution: "FRONT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 83, scramble: "FOWRN", solution: "FROWN", difficulty: "Easy", isUnsolvable: false },
  { itemId: 84, scramble: "FIRUT", solution: "FRUIT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 85, scramble: "GEAUZ", solution: "GAUZE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 86, scramble: "GLDAN", solution: "GLAND", difficulty: "Easy", isUnsolvable: false },
  { itemId: 87, scramble: "GALEM", solution: "GLEAM", difficulty: "Easy", isUnsolvable: false },
  { itemId: 88, scramble: "GLTIN", solution: "GLINT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 89, scramble: "GORLY", solution: "GLORY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 90, scramble: "GOVEL", solution: "GLOVE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 91, scramble: "GOMEN", solution: "GNOME", difficulty: "Easy", isUnsolvable: false },
  { itemId: 92, scramble: "GRTAF", solution: "GRAFT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 93, scramble: "GRTAN", solution: "GRANT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 94, scramble: "GHAPR", solution: "GRAPH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 95, scramble: "GREAV", solution: "GRAVE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 96, scramble: "GERIF", solution: "GRIEF", difficulty: "Easy", isUnsolvable: false },
  { itemId: 97, scramble: "GOUPR", solution: "GROUP", difficulty: "Easy", isUnsolvable: false },
  { itemId: 98, scramble: "GURAD", solution: "GUARD", difficulty: "Easy", isUnsolvable: false },
  { itemId: 99, scramble: "GUTIL", solution: "GUILT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 100, scramble: "HANEV", solution: "HAVEN", difficulty: "Easy", isUnsolvable: false },
  { itemId: 101, scramble: "HACOV", solution: "HAVOC", difficulty: "Easy", isUnsolvable: false },
  { itemId: 102, scramble: "HONYE", solution: "HONEY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 103, scramble: "HORED", solution: "HORDE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 104, scramble: "HUNDO", solution: "HOUND", difficulty: "Easy", isUnsolvable: false },
  { itemId: 105, scramble: "HOUES", solution: "HOUSE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 106, scramble: "HOLEV", solution: "HOVEL", difficulty: "Easy", isUnsolvable: false },
  { itemId: 107, scramble: "HENAY", solution: "HYENA", difficulty: "Easy", isUnsolvable: false },
  { itemId: 108, scramble: "ILDER", solution: "IDLER", difficulty: "Easy", isUnsolvable: false },
  { itemId: 109, scramble: "INXED", solution: "INDEX", difficulty: "Easy", isUnsolvable: false },
  { itemId: 110, scramble: "INTUP", solution: "INPUT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 111, scramble: "JUGED", solution: "JUDGE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 112, scramble: "JUCEI", solution: "JUICE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 113, scramble: "JOTIN", solution: "JOINT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 114, scramble: "KNEAV", solution: "KNAVE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 115, scramble: "KENIF", solution: "KNIFE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 116, scramble: "LACHR", solution: "LARCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 117, scramble: "LTIGH", solution: "LIGHT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 118, scramble: "LOIMB", solution: "LIMBO", difficulty: "Easy", isUnsolvable: false },
  { itemId: 119, scramble: "LIGOC", solution: "LOGIC", difficulty: "Easy", isUnsolvable: false },
  { itemId: 120, scramble: "LOREV", solution: "LOVER", difficulty: "Easy", isUnsolvable: false },
  { itemId: 121, scramble: "LUCHN", solution: "LUNCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 122, scramble: "LIRYC", solution: "LYRIC", difficulty: "Easy", isUnsolvable: false },
  { itemId: 123, scramble: "MAROJ", solution: "MAJOR", difficulty: "Easy", isUnsolvable: false },
  { itemId: 124, scramble: "MAREK", solution: "MAKER", difficulty: "Easy", isUnsolvable: false },
  { itemId: 125, scramble: "MACHT", solution: "MATCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 126, scramble: "MEALD", solution: "MEDAL", difficulty: "Easy", isUnsolvable: false },
  { itemId: 127, scramble: "MECRY", solution: "MERCY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 128, scramble: "MIGED", solution: "MIDGE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 129, scramble: "MEINC", solution: "MINCE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 130, scramble: "MIREN", solution: "MINER", difficulty: "Easy", isUnsolvable: false },
  { itemId: 131, scramble: "MITHR", solution: "MIRTH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 132, scramble: "MIREX", solution: "MIXER", difficulty: "Easy", isUnsolvable: false },
  { itemId: 133, scramble: "MNTHO", solution: "MONTH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 134, scramble: "MUTHO", solution: "MOUTH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 135, scramble: "NYPHM", solution: "NYMPH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 136, scramble: "OREPA", solution: "OPERA", difficulty: "Easy", isUnsolvable: false },
  { itemId: 137, scramble: "OUPIM", solution: "OPIUM", difficulty: "Easy", isUnsolvable: false },
  { itemId: 138, scramble: "OBRIT", solution: "ORBIT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 139, scramble: "OUNEC", solution: "OUNCE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 140, scramble: "ORAVY", solution: "OVARY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 141, scramble: "PINAC", solution: "PANIC", difficulty: "Easy", isUnsolvable: false },
  { itemId: 142, scramble: "PHERC", solution: "PERCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 143, scramble: "PLOIT", solution: "PILOT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 144, scramble: "PICHT", solution: "PITCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 145, scramble: "PITOV", solution: "PIVOT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 146, scramble: "PLAKN", solution: "PLANK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 147, scramble: "PLTAN", solution: "PLANT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 148, scramble: "PUCLK", solution: "PLUCK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 149, scramble: "PLEMU", solution: "PLUME", difficulty: "Easy", isUnsolvable: false },
  { itemId: 150, scramble: "PROCH", solution: "PORCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 151, scramble: "PARNK", solution: "PRANK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 152, scramble: "PRNAW", solution: "PRAWN", difficulty: "Easy", isUnsolvable: false },
  { itemId: 153, scramble: "PERIZ", solution: "PRIZE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 154, scramble: "PERUN", solution: "PRUNE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 155, scramble: "PLONY", solution: "PYLON", difficulty: "Easy", isUnsolvable: false },
  { itemId: 156, scramble: "QUREY", solution: "QUERY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 157, scramble: "QUTIL", solution: "QUILT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 158, scramble: "RNACH", solution: "RANCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 159, scramble: "RHEMY", solution: "RHYME", difficulty: "Easy", isUnsolvable: false },
  { itemId: 160, scramble: "RITEV", solution: "RIVET", difficulty: "Easy", isUnsolvable: false },
  { itemId: 161, scramble: "RUGYB", solution: "RUGBY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 162, scramble: "SCRAF", solution: "SCARF", difficulty: "Easy", isUnsolvable: false },
  { itemId: 163, scramble: "STCOU", solution: "SCOUT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 164, scramble: "SUCRM", solution: "SCRUM", difficulty: "Easy", isUnsolvable: false },
  { itemId: 165, scramble: "SWHAL", solution: "SHAWL", difficulty: "Easy", isUnsolvable: false },
  { itemId: 166, scramble: "SCANK", solution: "SNACK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 167, scramble: "SQUBI", solution: "SQUIB", difficulty: "Easy", isUnsolvable: false },
  { itemId: 168, scramble: "STELY", solution: "STYLE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 169, scramble: "TEPOM", solution: "TEMPO", difficulty: "Easy", isUnsolvable: false },
  { itemId: 170, scramble: "THEIF", solution: "THIEF", difficulty: "Easy", isUnsolvable: false },
  { itemId: 171, scramble: "THMBU", solution: "THUMB", difficulty: "Easy", isUnsolvable: false },
  { itemId: 172, scramble: "TONKE", solution: "TOKEN", difficulty: "Easy", isUnsolvable: false },
  { itemId: 173, scramble: "TRMAP", solution: "TRAMP", difficulty: "Easy", isUnsolvable: false },
  { itemId: 174, scramble: "TERND", solution: "TREND", difficulty: "Easy", isUnsolvable: false },
  { itemId: 175, scramble: "TIRCK", solution: "TRICK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 176, scramble: "TURCK", solution: "TRUCK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 177, scramble: "TURMP", solution: "TRUMP", difficulty: "Easy", isUnsolvable: false },
  { itemId: 178, scramble: "TILUP", solution: "TULIP", difficulty: "Easy", isUnsolvable: false },
  { itemId: 179, scramble: "UNCEL", solution: "UNCLE", difficulty: "Easy", isUnsolvable: false },
  { itemId: 180, scramble: "UTINY", solution: "UNITY", difficulty: "Easy", isUnsolvable: false },
  { itemId: 181, scramble: "VELAT", solution: "VALET", difficulty: "Easy", isUnsolvable: false },
  { itemId: 182, scramble: "VATUL", solution: "VAULT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 183, scramble: "VEMON", solution: "VENOM", difficulty: "Easy", isUnsolvable: false },
  { itemId: 184, scramble: "VIRAC", solution: "VICAR", difficulty: "Easy", isUnsolvable: false },
  { itemId: 185, scramble: "VIREP", solution: "VIPER", difficulty: "Easy", isUnsolvable: false },
  { itemId: 186, scramble: "VIRSU", solution: "VIRUS", difficulty: "Easy", isUnsolvable: false },
  { itemId: 187, scramble: "VIRSO", solution: "VISOR", difficulty: "Easy", isUnsolvable: false },
  { itemId: 188, scramble: "VITAS", solution: "VISTA", difficulty: "Easy", isUnsolvable: false },
  { itemId: 189, scramble: "VINEX", solution: "VIXEN", difficulty: "Easy", isUnsolvable: false },
  { itemId: 190, scramble: "VODAK", solution: "VODKA", difficulty: "Easy", isUnsolvable: false },
  { itemId: 191, scramble: "WLTAZ", solution: "WALTZ", difficulty: "Easy", isUnsolvable: false },
  { itemId: 192, scramble: "WACHT", solution: "WATCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 193, scramble: "WHENC", solution: "WENCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 194, scramble: "WHAFR", solution: "WHARF", difficulty: "Easy", isUnsolvable: false },
  { itemId: 195, scramble: "WHTEA", solution: "WHEAT", difficulty: "Easy", isUnsolvable: false },
  { itemId: 196, scramble: "WDITH", solution: "WIDTH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 197, scramble: "WHITC", solution: "WITCH", difficulty: "Easy", isUnsolvable: false },
  { itemId: 198, scramble: "WONAM", solution: "WOMAN", difficulty: "Easy", isUnsolvable: false },
  { itemId: 199, scramble: "WOLDR", solution: "WORLD", difficulty: "Easy", isUnsolvable: false },
  { itemId: 200, scramble: "WONDU", solution: "WOUND", difficulty: "Easy", isUnsolvable: false },
  { itemId: 201, scramble: "WERCK", solution: "WRECK", difficulty: "Easy", isUnsolvable: false },
  { itemId: 202, scramble: "YOTHU", solution: "YOUTH", difficulty: "Easy", isUnsolvable: false },

  ],
  Moderate: [
{ itemId: 1, scramble: "YOANG", solution: "AGONY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 2, scramble: "MLBAU", solution: "ALBUM", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 3, scramble: "KNLAE", solution: "ANKLE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 4, scramble: "NPRAO", solution: "APRON", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 5, scramble: "JOBAN", solution: "BANJO", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 6, scramble: "ACTBH", solution: "BATCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 7, scramble: "ATBNO", solution: "BATON", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 8, scramble: "ECNBH", solution: "BENCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 9, scramble: "THREB", solution: "BERTH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 10, scramble: "TBGOI", solution: "BIGOT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 11, scramble: "CHRBI", solution: "BIRCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 12, scramble: "HTCIB", solution: "BITCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 13, scramble: "CKALB", solution: "BLACK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 14, scramble: "LEDAB", solution: "BLADE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 15, scramble: "ZLBAE", solution: "BLAZE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 16, scramble: "MBIPL", solution: "BLIMP", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 17, scramble: "LOBKC", solution: "BLOCK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 18, scramble: "NRDAB", solution: "BRAND", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 19, scramble: "WARLB", solution: "BRAWL", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 20, scramble: "IRKCB", solution: "BRICK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 21, scramble: "INERB", solution: "BRINE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 22, scramble: "NKIRB", solution: "BRINK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 23, scramble: "CHNUB", solution: "BUNCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 24, scramble: "RBYEU", solution: "BUYER", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 25, scramble: "BIANC", solution: "CABIN", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 26, scramble: "AEBLC", solution: "CABLE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 27, scramble: "NARIC", solution: "CAIRN", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 28, scramble: "HCIRA", solution: "CHAIR", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 29, scramble: "LKACH", solution: "CHALK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 30, scramble: "LDHIC", solution: "CHILD", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 31, scramble: "HCMEI", solution: "CHIME", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 32, scramble: "PHMIC", solution: "CHIMP", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 33, scramble: "HRCOD", solution: "CHORD", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 34, scramble: "UHMCP", solution: "CHUMP", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 35, scramble: "HCNUK", solution: "CHUNK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 36, scramble: "PACLM", solution: "CLAMP", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 37, scramble: "LSCHA", solution: "CLASH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 38, scramble: "KERCL", solution: "CLERK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 39, scramble: "KCOAL", solution: "CLOAK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 40, scramble: "HTCLO", solution: "CLOTH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 41, scramble: "WNOCL", solution: "CLOWN", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 42, scramble: "OCGIR", solution: "CORGI", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 43, scramble: "UTCON", solution: "COUNT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 44, scramble: "UGOCH", solution: "COUGH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 45, scramble: "RECOV", solution: "COVER", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 46, scramble: "FTARC", solution: "CRAFT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 47, scramble: "MPARC", solution: "CRAMP", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 48, scramble: "RCNKA", solution: "CRANK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 49, scramble: "RCZAE", solution: "CRAZE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 50, scramble: "FTORC", solution: "CROFT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 51, scramble: "WDORC", solution: "CROWD", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 52, scramble: "RMBUC", solution: "CRUMB", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 53, scramble: "UCHRS", solution: "CRUSH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 54, scramble: "PYCRT", solution: "CRYPT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 55, scramble: "ENDOM", solution: "DEMON", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 56, scramble: "PHEDT", solution: "DEPTH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 57, scramble: "IOVDT", solution: "DIVOT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 58, scramble: "TUDOB", solution: "DOUBT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 59, scramble: "WRLAD", solution: "DRAWL", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 60, scramble: "KDINR", solution: "DRINK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 61, scramble: "KDUNR", solution: "DRUNK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 62, scramble: "CENDU", solution: "DUNCE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 63, scramble: "TRENY", solution: "ENTRY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 64, scramble: "RIFAY", solution: "FAIRY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 65, scramble: "AIHTF", solution: "FAITH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 66, scramble: "AFCNY", solution: "FANCY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 67, scramble: "TULAF", solution: "FAULT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 68, scramble: "TFIHG", solution: "FIGHT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 69, scramble: "HTILF", solution: "FILTH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 70, scramble: "NCHFI", solution: "FINCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 71, scramble: "LKEAF", solution: "FLAKE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 72, scramble: "MAFLE", solution: "FLAME", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 73, scramble: "KNALF", solution: "FLANK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 74, scramble: "SHLAF", solution: "FLASH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 75, scramble: "LKSAF", solution: "FLASK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 76, scramble: "ILRFT", solution: "FLIRT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 77, scramble: "UFELK", solution: "FLUKE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 78, scramble: "ROCFE", solution: "FORCE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 79, scramble: "ORFMU", solution: "FORUM", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 80, scramble: "AOVFE", solution: "FOVEA", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 81, scramble: "DARUF", solution: "FRAUD", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 82, scramble: "NTROF", solution: "FRONT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 83, scramble: "NOWFR", solution: "FROWN", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 84, scramble: "TRFIU", solution: "FRUIT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 85, scramble: "ZEGAU", solution: "GAUZE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 86, scramble: "NALDG", solution: "GLAND", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 87, scramble: "MEAGL", solution: "GLEAM", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 88, scramble: "NIGLT", solution: "GLINT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 89, scramble: "LROGY", solution: "GLORY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 90, scramble: "ELGVO", solution: "GLOVE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 91, scramble: "NEGOM", solution: "GNOME", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 92, scramble: "AFTRG", solution: "GRAFT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 93, scramble: "TARNG", solution: "GRANT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 94, scramble: "PHARG", solution: "GRAPH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 95, scramble: "VEARG", solution: "GRAVE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 96, scramble: "FIREG", solution: "GRIEF", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 97, scramble: "ROGPU", solution: "GROUP", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 98, scramble: "URAGD", solution: "GUARD", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 99, scramble: "IUTLG", solution: "GUILT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 100, scramble: "VEHAN", solution: "HAVEN", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 101, scramble: "COHAV", solution: "HAVOC", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 102, scramble: "EOHNY", solution: "HONEY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 103, scramble: "OHDER", solution: "HORDE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 104, scramble: "UODNH", solution: "HOUND", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 105, scramble: "SHEOU", solution: "HOUSE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 106, scramble: "VELOH", solution: "HOVEL", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 107, scramble: "AYHNE", solution: "HYENA", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 108, scramble: "DERIL", solution: "IDLER", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 109, scramble: "EXIND", solution: "INDEX", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 110, scramble: "PITUN", solution: "INPUT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 111, scramble: "GJDUE", solution: "JUDGE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 112, scramble: "UCEIJ", solution: "JUICE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 113, scramble: "TINJO", solution: "JOINT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 114, scramble: "VNAEK", solution: "KNAVE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 115, scramble: "NKEFI", solution: "KNIFE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 116, scramble: "ACHRL", solution: "LARCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 117, scramble: "GILTH", solution: "LIGHT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 118, scramble: "BLOIM", solution: "LIMBO", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 119, scramble: "OCLIG", solution: "LOGIC", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 120, scramble: "RELOV", solution: "LOVER", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 121, scramble: "CHUNL", solution: "LUNCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 122, scramble: "IYRCL", solution: "LYRIC", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 123, scramble: "AMRJO", solution: "MAJOR", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 124, scramble: "ERMAK", solution: "MAKER", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 125, scramble: "TACMH", solution: "MATCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 126, scramble: "LDEAM", solution: "MEDAL", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 127, scramble: "CREMY", solution: "MERCY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 128, scramble: "IGEDM", solution: "MIDGE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 129, scramble: "EIMCN", solution: "MINCE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 130, scramble: "IMRNE", solution: "MINER", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 131, scramble: "RITMH", solution: "MIRTH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 132, scramble: "XEMIR", solution: "MIXER", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 133, scramble: "THNOM", solution: "MONTH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 134, scramble: "THUMO", solution: "MOUTH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 135, scramble: "YMNHP", solution: "NYMPH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 136, scramble: "POEAR", solution: "OPERA", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 137, scramble: "IMOUP", solution: "OPIUM", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 138, scramble: "RBTIO", solution: "ORBIT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 139, scramble: "ENCOU", solution: "OUNCE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 140, scramble: "YAROV", solution: "OVARY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 141, scramble: "NCAPI", solution: "PANIC", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 142, scramble: "RPEHC", solution: "PERCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 143, scramble: "OILTP", solution: "PILOT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 144, scramble: "ITPHC", solution: "PITCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 145, scramble: "VOPIT", solution: "PIVOT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 146, scramble: "NKLAP", solution: "PLANK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 147, scramble: "NALPT", solution: "PLANT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 148, scramble: "UCKLP", solution: "PLUCK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 149, scramble: "MULEP", solution: "PLUME", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 150, scramble: "COPHR", solution: "PORCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 151, scramble: "ARNPK", solution: "PRANK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 152, scramble: "NAWRP", solution: "PRAWN", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 153, scramble: "ZIPER", solution: "PRIZE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 154, scramble: "UNEPR", solution: "PRUNE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 155, scramble: "YLPNO", solution: "PYLON", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 156, scramble: "EURQY", solution: "QUERY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 157, scramble: "LQIUT", solution: "QUILT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 158, scramble: "ACNRH", solution: "RANCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 159, scramble: "HEYRM", solution: "RHYME", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 160, scramble: "EIVTR", solution: "RIVET", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 161, scramble: "YRUBG", solution: "RUGBY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 162, scramble: "FRCAS", solution: "SCARF", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 163, scramble: "USTCO", solution: "SCOUT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 164, scramble: "MUCRS", solution: "SCRUM", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 165, scramble: "AHWSL", solution: "SHAWL", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 166, scramble: "CANKS", solution: "SNACK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 167, scramble: "BUSIQ", solution: "SQUIB", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 168, scramble: "YLEST", solution: "STYLE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 169, scramble: "POMET", solution: "TEMPO", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 170, scramble: "FEITH", solution: "THIEF", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 171, scramble: "MTUHB", solution: "THUMB", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 172, scramble: "ETONK", solution: "TOKEN", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 173, scramble: "PRMAT", solution: "TRAMP", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 174, scramble: "NDRET", solution: "TREND", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 175, scramble: "KIRTC", solution: "TRICK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 176, scramble: "RUKCT", solution: "TRUCK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 177, scramble: "URPMT", solution: "TRUMP", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 178, scramble: "UILTP", solution: "TULIP", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 179, scramble: "CULEN", solution: "UNCLE", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 180, scramble: "YINTU", solution: "UNITY", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 181, scramble: "LAETV", solution: "VALET", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 182, scramble: "ALUVT", solution: "VAULT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 183, scramble: "EONVM", solution: "VENOM", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 184, scramble: "CAVIR", solution: "VICAR", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 185, scramble: "PRIEV", solution: "VIPER", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 186, scramble: "RIUVS", solution: "VIRUS", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 187, scramble: "ROSIV", solution: "VISOR", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 188, scramble: "ATSIV", solution: "VISTA", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 189, scramble: "NVXEI", solution: "VIXEN", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 190, scramble: "KVDOA", solution: "VODKA", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 191, scramble: "ZATWL", solution: "WALTZ", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 192, scramble: "CHATW", solution: "WATCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 193, scramble: "CHENW", solution: "WENCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 194, scramble: "HFARW", solution: "WHARF", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 195, scramble: "THWAE", solution: "WHEAT", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 196, scramble: "HIWTD", solution: "WIDTH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 197, scramble: "HWTCI", solution: "WITCH", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 198, scramble: "OWNAM", solution: "WOMAN", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 199, scramble: "ORWDL", solution: "WORLD", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 200, scramble: "NDWOU", solution: "WOUND", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 201, scramble: "CKREW", solution: "WRECK", difficulty: "Moderate", isUnsolvable: false },
  { itemId: 202, scramble: "HUTYO", solution: "YOUTH", difficulty: "Moderate", isUnsolvable: false },
  ],
  Hard: [
{ itemId: 1, scramble: "NYGAO", solution: "AGONY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 2, scramble: "UBMLA", solution: "ALBUM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 3, scramble: "ELNAK", solution: "ANKLE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 4, scramble: "ORNPA", solution: "APRON", difficulty: "Hard", isUnsolvable: false },
  { itemId: 5, scramble: "OJBNA", solution: "BANJO", difficulty: "Hard", isUnsolvable: false },
  { itemId: 6, scramble: "HCBTA", solution: "BATCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 7, scramble: "OTNBA", solution: "BATON", difficulty: "Hard", isUnsolvable: false },
  { itemId: 8, scramble: "CNHBE", solution: "BENCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 9, scramble: "TRHBE", solution: "BERTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 10, scramble: "OGTBI", solution: "BIGOT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 11, scramble: "RHCBI", solution: "BIRCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 12, scramble: "HCBTI", solution: "BITCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 13, scramble: "KCBAL", solution: "BLACK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 14, scramble: "AEDBL", solution: "BLADE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 15, scramble: "AEZLB", solution: "BLAZE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 16, scramble: "IPMLB", solution: "BLIMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 17, scramble: "OKCBL", solution: "BLOCK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 18, scramble: "DNBAR", solution: "BRAND", difficulty: "Hard", isUnsolvable: false },
  { itemId: 19, scramble: "LWBAR", solution: "BRAWL", difficulty: "Hard", isUnsolvable: false },
  { itemId: 20, scramble: "IKCBR", solution: "BRICK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 21, scramble: "ENBIR", solution: "BRINE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 22, scramble: "NIKBR", solution: "BRINK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 23, scramble: "CNHBU", solution: "BUNCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 24, scramble: "REBYU", solution: "BUYER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 25, scramble: "NIACB", solution: "CABIN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 26, scramble: "ELCBA", solution: "CABLE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 27, scramble: "NRCIA", solution: "CAIRN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 28, scramble: "RIHCA", solution: "CHAIR", difficulty: "Hard", isUnsolvable: false },
  { itemId: 29, scramble: "KLHCA", solution: "CHALK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 30, scramble: "DLHCI", solution: "CHILD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 31, scramble: "EMHCI", solution: "CHIME", difficulty: "Hard", isUnsolvable: false },
  { itemId: 32, scramble: "PMHCI", solution: "CHIMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 33, scramble: "RODHC", solution: "CHORD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 34, scramble: "PMHCU", solution: "CHUMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 35, scramble: "UKNHC", solution: "CHUNK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 36, scramble: "APMLC", solution: "CLAMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 37, scramble: "SAHCL", solution: "CLASH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 38, scramble: "EKRLC", solution: "CLERK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 39, scramble: "AOKCL", solution: "CLOAK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 40, scramble: "TOHCL", solution: "CLOTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 41, scramble: "NWCOL", solution: "CLOWN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 42, scramble: "IGCRO", solution: "CORGI", difficulty: "Hard", isUnsolvable: false },
  { itemId: 43, scramble: "TNCUO", solution: "COUNT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 44, scramble: "UHGCO", solution: "COUGH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 45, scramble: "REOCV", solution: "COVER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 46, scramble: "ATFCR", solution: "CRAFT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 47, scramble: "APMRC", solution: "CRAMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 48, scramble: "NAKCR", solution: "CRANK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 49, scramble: "AEZRC", solution: "CRAZE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 50, scramble: "OTFCR", solution: "CROFT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 51, scramble: "ODWCR", solution: "CROWD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 52, scramble: "UBMRC", solution: "CRUMB", difficulty: "Hard", isUnsolvable: false },
  { itemId: 53, scramble: "UHSRC", solution: "CRUSH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 54, scramble: "YTPCR", solution: "CRYPT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 55, scramble: "MNODE", solution: "DEMON", difficulty: "Hard", isUnsolvable: false },
  { itemId: 56, scramble: "TPHDE", solution: "DEPTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 57, scramble: "OVTDI", solution: "DIVOT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 58, scramble: "TBDUO", solution: "DOUBT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 59, scramble: "WLRDA", solution: "DRAWL", difficulty: "Hard", isUnsolvable: false },
  { itemId: 60, scramble: "NIKDR", solution: "DRINK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 61, scramble: "NUKDR", solution: "DRUNK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 62, scramble: "ECDNU", solution: "DUNCE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 63, scramble: "YRETN", solution: "ENTRY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 64, scramble: "RIYFA", solution: "FAIRY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 65, scramble: "TIHFA", solution: "FAITH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 66, scramble: "YCFNA", solution: "FANCY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 67, scramble: "LTFUA", solution: "FAULT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 68, scramble: "HGTFI", solution: "FIGHT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 69, scramble: "TLHFI", solution: "FILTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 70, scramble: "HCFNI", solution: "FINCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 71, scramble: "AEKFL", solution: "FLAKE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 72, scramble: "AEMLF", solution: "FLAME", difficulty: "Hard", isUnsolvable: false },
  { itemId: 73, scramble: "KNLFA", solution: "FLANK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 74, scramble: "AHSFL", solution: "FLASH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 75, scramble: "SAKFL", solution: "FLASK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 76, scramble: "RITFL", solution: "FLIRT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 77, scramble: "UEKFL", solution: "FLUKE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 78, scramble: "ECFRO", solution: "FORCE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 79, scramble: "UOFMR", solution: "FORUM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 80, scramble: "AEOFV", solution: "FOVEA", difficulty: "Hard", isUnsolvable: false },
  { itemId: 81, scramble: "UADFR", solution: "FRAUD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 82, scramble: "TNRFO", solution: "FRONT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 83, scramble: "NWRFO", solution: "FROWN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 84, scramble: "IUTFR", solution: "FRUIT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 85, scramble: "EZGUA", solution: "GAUZE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 86, scramble: "DNLGA", solution: "GLAND", difficulty: "Hard", isUnsolvable: false },
  { itemId: 87, scramble: "AEMLG", solution: "GLEAM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 88, scramble: "TNLGI", solution: "GLINT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 89, scramble: "OYRLG", solution: "GLORY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 90, scramble: "OEVLG", solution: "GLOVE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 91, scramble: "OEMGN", solution: "GNOME", difficulty: "Hard", isUnsolvable: false },
  { itemId: 92, scramble: "ATFGR", solution: "GRAFT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 93, scramble: "TNRGA", solution: "GRANT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 94, scramble: "AHPGR", solution: "GRAPH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 95, scramble: "AEVGR", solution: "GRAVE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 96, scramble: "EFGIR", solution: "GRIEF", difficulty: "Hard", isUnsolvable: false },
  { itemId: 97, scramble: "UOPGR", solution: "GROUP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 98, scramble: "RGDUA", solution: "GUARD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 99, scramble: "LTGIU", solution: "GUILT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 100, scramble: "ENHVA", solution: "HAVEN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 101, scramble: "COHVA", solution: "HAVOC", difficulty: "Hard", isUnsolvable: false },
  { itemId: 102, scramble: "EYHNO", solution: "HONEY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 103, scramble: "DEOHR", solution: "HORDE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 104, scramble: "DNHUO", solution: "HOUND", difficulty: "Hard", isUnsolvable: false },
  { itemId: 105, scramble: "SEHUO", solution: "HOUSE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 106, scramble: "ELHVO", solution: "HOVEL", difficulty: "Hard", isUnsolvable: false },
  { itemId: 107, scramble: "EANHY", solution: "HYENA", difficulty: "Hard", isUnsolvable: false },
  { itemId: 108, scramble: "ELRDI", solution: "IDLER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 109, scramble: "EDXNI", solution: "INDEX", difficulty: "Hard", isUnsolvable: false },
  { itemId: 110, scramble: "UPTNI", solution: "INPUT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 111, scramble: "EGJDU", solution: "JUDGE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 112, scramble: "ECJIU", solution: "JUICE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 113, scramble: "TNOJI", solution: "JOINT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 114, scramble: "AEVKN", solution: "KNAVE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 115, scramble: "EFNKI", solution: "KNIFE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 116, scramble: "HCLRA", solution: "LARCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 117, scramble: "HGTLI", solution: "LIGHT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 118, scramble: "BMOLI", solution: "LIMBO", difficulty: "Hard", isUnsolvable: false },
  { itemId: 119, scramble: "GCIOL", solution: "LOGIC", difficulty: "Hard", isUnsolvable: false },
  { itemId: 120, scramble: "VREOL", solution: "LOVER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 121, scramble: "CNHLU", solution: "LUNCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 122, scramble: "CIYLR", solution: "LYRIC", difficulty: "Hard", isUnsolvable: false },
  { itemId: 123, scramble: "OJRMA", solution: "MAJOR", difficulty: "Hard", isUnsolvable: false },
  { itemId: 124, scramble: "ERMKA", solution: "MAKER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 125, scramble: "HCMTA", solution: "MATCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 126, scramble: "LAEMD", solution: "MEDAL", difficulty: "Hard", isUnsolvable: false },
  { itemId: 127, scramble: "YCMRE", solution: "MERCY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 128, scramble: "EGMDI", solution: "MIDGE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 129, scramble: "ECMNI", solution: "MINCE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 130, scramble: "ERMNI", solution: "MINER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 131, scramble: "HTMRI", solution: "MIRTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 132, scramble: "EXRMI", solution: "MIXER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 133, scramble: "TNHMO", solution: "MONTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 134, scramble: "UHTMO", solution: "MOUTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 135, scramble: "MHPNY", solution: "NYMPH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 136, scramble: "RAOEP", solution: "OPERA", difficulty: "Hard", isUnsolvable: false },
  { itemId: 137, scramble: "IUOPM", solution: "OPIUM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 138, scramble: "IBTRO", solution: "ORBIT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 139, scramble: "CNEUO", solution: "OUNCE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 140, scramble: "RYVOA", solution: "OVARY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 141, scramble: "ICPNA", solution: "PANIC", difficulty: "Hard", isUnsolvable: false },
  { itemId: 142, scramble: "RHCPE", solution: "PERCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 143, scramble: "OLTPI", solution: "PILOT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 144, scramble: "HCPTI", solution: "PITCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 145, scramble: "OVTPI", solution: "PIVOT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 146, scramble: "LNPKA", solution: "PLANK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 147, scramble: "TNLPA", solution: "PLANT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 148, scramble: "UKCPL", solution: "PLUCK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 149, scramble: "EMLPU", solution: "PLUME", difficulty: "Hard", isUnsolvable: false },
  { itemId: 150, scramble: "RHCPO", solution: "PORCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 151, scramble: "NAKPR", solution: "PRANK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 152, scramble: "ANWPR", solution: "PRAWN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 153, scramble: "EZRPI", solution: "PRIZE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 154, scramble: "ENRPU", solution: "PRUNE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 155, scramble: "OLNPY", solution: "PYLON", difficulty: "Hard", isUnsolvable: false },
  { itemId: 156, scramble: "YRQEU", solution: "QUERY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 157, scramble: "TLQIU", solution: "QUILT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 158, scramble: "CNHRA", solution: "RANCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 159, scramble: "EMRYH", solution: "RHYME", difficulty: "Hard", isUnsolvable: false },
  { itemId: 160, scramble: "EVTIR", solution: "RIVET", difficulty: "Hard", isUnsolvable: false },
  { itemId: 161, scramble: "BGYUR", solution: "RUGBY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 162, scramble: "RFCSA", solution: "SCARF", difficulty: "Hard", isUnsolvable: false },
  { itemId: 163, scramble: "UOTCS", solution: "SCOUT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 164, scramble: "UMCSR", solution: "SCRUM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 165, scramble: "WLHSA", solution: "SHAWL", difficulty: "Hard", isUnsolvable: false },
  { itemId: 166, scramble: "KCNSA", solution: "SNACK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 167, scramble: "IUBQS", solution: "SQUIB", difficulty: "Hard", isUnsolvable: false },
  { itemId: 168, scramble: "ELSYT", solution: "STYLE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 169, scramble: "OPTME", solution: "TEMPO", difficulty: "Hard", isUnsolvable: false },
  { itemId: 170, scramble: "EFHTI", solution: "THIEF", difficulty: "Hard", isUnsolvable: false },
  { itemId: 171, scramble: "BMTUH", solution: "THUMB", difficulty: "Hard", isUnsolvable: false },
  { itemId: 172, scramble: "NETKO", solution: "TOKEN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 173, scramble: "APMRT", solution: "TRAMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 174, scramble: "EDNRT", solution: "TREND", difficulty: "Hard", isUnsolvable: false },
  { itemId: 175, scramble: "CIKTR", solution: "TRICK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 176, scramble: "UKCTR", solution: "TRUCK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 177, scramble: "UPMRT", solution: "TRUMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 178, scramble: "PIUTL", solution: "TULIP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 179, scramble: "LEUCN", solution: "UNCLE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 180, scramble: "IYTNU", solution: "UNITY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 181, scramble: "ETVLA", solution: "VALET", difficulty: "Hard", isUnsolvable: false },
  { itemId: 182, scramble: "LTVUA", solution: "VAULT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 183, scramble: "OMVNE", solution: "VENOM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 184, scramble: "ARVCI", solution: "VICAR", difficulty: "Hard", isUnsolvable: false },
  { itemId: 185, scramble: "ERVPI", solution: "VIPER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 186, scramble: "USVRI", solution: "VIRUS", difficulty: "Hard", isUnsolvable: false },
  { itemId: 187, scramble: "OSRVI", solution: "VISOR", difficulty: "Hard", isUnsolvable: false },
  { itemId: 188, scramble: "ATVSI", solution: "VISTA", difficulty: "Hard", isUnsolvable: false },
  { itemId: 189, scramble: "EXNVI", solution: "VIXEN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 190, scramble: "AKVDO", solution: "VODKA", difficulty: "Hard", isUnsolvable: false },
  { itemId: 191, scramble: "TLZWA", solution: "WALTZ", difficulty: "Hard", isUnsolvable: false },
  { itemId: 192, scramble: "HCWTA", solution: "WATCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 193, scramble: "CNHWE", solution: "WENCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 194, scramble: "RFHWA", solution: "WHARF", difficulty: "Hard", isUnsolvable: false },
  { itemId: 195, scramble: "AETHW", solution: "WHEAT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 196, scramble: "TDHWI", solution: "WIDTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 197, scramble: "HCIWT", solution: "WITCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 198, scramble: "ANWMO", solution: "WOMAN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 199, scramble: "LRDWO", solution: "WORLD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 200, scramble: "DNWUO", solution: "WOUND", difficulty: "Hard", isUnsolvable: false },
  { itemId: 201, scramble: "EKCWR", solution: "WRECK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 202, scramble: "TUHYO", solution: "YOUTH", difficulty: "Hard", isUnsolvable: false },
  ],
  MixedFutility: [
{ itemId: 1, scramble: "NYGAO", solution: "AGONY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 2, scramble: "UBMLA", solution: "ALBUM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 3, scramble: "ELNAK", solution: "ANKLE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 4, scramble: "ORNPA", solution: "APRON", difficulty: "Hard", isUnsolvable: false },
  { itemId: 5, scramble: "OJBNA", solution: "BANJO", difficulty: "Hard", isUnsolvable: false },
  { itemId: 6, scramble: "HCBTA", solution: "BATCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 7, scramble: "OTNBA", solution: "BATON", difficulty: "Hard", isUnsolvable: false },
  { itemId: 8, scramble: "CNHBE", solution: "BENCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 9, scramble: "TRHBE", solution: "BERTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 10, scramble: "OGTBI", solution: "BIGOT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 11, scramble: "RHCBI", solution: "BIRCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 12, scramble: "HCBTI", solution: "BITCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 13, scramble: "KCBAL", solution: "BLACK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 14, scramble: "AEDBL", solution: "BLADE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 15, scramble: "AEZLB", solution: "BLAZE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 16, scramble: "IPMLB", solution: "BLIMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 17, scramble: "OKCBL", solution: "BLOCK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 18, scramble: "DNBAR", solution: "BRAND", difficulty: "Hard", isUnsolvable: false },
  { itemId: 19, scramble: "LWBAR", solution: "BRAWL", difficulty: "Hard", isUnsolvable: false },
  { itemId: 20, scramble: "IKCBR", solution: "BRICK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 21, scramble: "ENBIR", solution: "BRINE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 22, scramble: "NIKBR", solution: "BRINK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 23, scramble: "CNHBU", solution: "BUNCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 24, scramble: "REBYU", solution: "BUYER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 25, scramble: "NIACB", solution: "CABIN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 26, scramble: "ELCBA", solution: "CABLE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 27, scramble: "NRCIA", solution: "CAIRN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 28, scramble: "RIHCA", solution: "CHAIR", difficulty: "Hard", isUnsolvable: false },
  { itemId: 29, scramble: "KLHCA", solution: "CHALK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 30, scramble: "DLHCI", solution: "CHILD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 31, scramble: "EMHCI", solution: "CHIME", difficulty: "Hard", isUnsolvable: false },
  { itemId: 32, scramble: "PMHCI", solution: "CHIMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 33, scramble: "RODHC", solution: "CHORD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 34, scramble: "PMHCU", solution: "CHUMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 35, scramble: "UKNHC", solution: "CHUNK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 36, scramble: "APMLC", solution: "CLAMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 37, scramble: "SAHCL", solution: "CLASH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 38, scramble: "EKRLC", solution: "CLERK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 39, scramble: "AOKCL", solution: "CLOAK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 40, scramble: "TOHCL", solution: "CLOTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 41, scramble: "NWCOL", solution: "CLOWN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 42, scramble: "IGCRO", solution: "CORGI", difficulty: "Hard", isUnsolvable: false },
  { itemId: 43, scramble: "TNCUO", solution: "COUNT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 44, scramble: "UHGCO", solution: "COUGH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 45, scramble: "REOCV", solution: "COVER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 46, scramble: "ATFCR", solution: "CRAFT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 47, scramble: "APMRC", solution: "CRAMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 48, scramble: "NAKCR", solution: "CRANK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 49, scramble: "AEZRC", solution: "CRAZE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 50, scramble: "OTFCR", solution: "CROFT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 51, scramble: "ODWCR", solution: "CROWD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 52, scramble: "UBMRC", solution: "CRUMB", difficulty: "Hard", isUnsolvable: false },
  { itemId: 53, scramble: "UHSRC", solution: "CRUSH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 54, scramble: "YTPCR", solution: "CRYPT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 55, scramble: "MNODE", solution: "DEMON", difficulty: "Hard", isUnsolvable: false },
  { itemId: 56, scramble: "TPHDE", solution: "DEPTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 57, scramble: "OVTDI", solution: "DIVOT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 58, scramble: "TBDUO", solution: "DOUBT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 59, scramble: "WLRDA", solution: "DRAWL", difficulty: "Hard", isUnsolvable: false },
  { itemId: 60, scramble: "NIKDR", solution: "DRINK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 61, scramble: "NUKDR", solution: "DRUNK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 62, scramble: "ECDNU", solution: "DUNCE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 63, scramble: "YRETN", solution: "ENTRY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 64, scramble: "RIYFA", solution: "FAIRY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 65, scramble: "TIHFA", solution: "FAITH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 66, scramble: "YCFNA", solution: "FANCY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 67, scramble: "LTFUA", solution: "FAULT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 68, scramble: "HGTFI", solution: "FIGHT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 69, scramble: "TLHFI", solution: "FILTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 70, scramble: "HCFNI", solution: "FINCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 71, scramble: "AEKFL", solution: "FLAKE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 72, scramble: "AEMLF", solution: "FLAME", difficulty: "Hard", isUnsolvable: false },
  { itemId: 73, scramble: "KNLFA", solution: "FLANK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 74, scramble: "AHSFL", solution: "FLASH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 75, scramble: "SAKFL", solution: "FLASK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 76, scramble: "RITFL", solution: "FLIRT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 77, scramble: "UEKFL", solution: "FLUKE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 78, scramble: "ECFRO", solution: "FORCE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 79, scramble: "UOFMR", solution: "FORUM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 80, scramble: "AEOFV", solution: "FOVEA", difficulty: "Hard", isUnsolvable: false },
  { itemId: 81, scramble: "UADFR", solution: "FRAUD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 82, scramble: "TNRFO", solution: "FRONT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 83, scramble: "NWRFO", solution: "FROWN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 84, scramble: "IUTFR", solution: "FRUIT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 85, scramble: "EZGUA", solution: "GAUZE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 86, scramble: "DNLGA", solution: "GLAND", difficulty: "Hard", isUnsolvable: false },
  { itemId: 87, scramble: "AEMLG", solution: "GLEAM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 88, scramble: "TNLGI", solution: "GLINT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 89, scramble: "OYRLG", solution: "GLORY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 90, scramble: "OEVLG", solution: "GLOVE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 91, scramble: "OEMGN", solution: "GNOME", difficulty: "Hard", isUnsolvable: false },
  { itemId: 92, scramble: "ATFGR", solution: "GRAFT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 93, scramble: "TNRGA", solution: "GRANT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 94, scramble: "AHPGR", solution: "GRAPH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 95, scramble: "AEVGR", solution: "GRAVE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 96, scramble: "EFGIR", solution: "GRIEF", difficulty: "Hard", isUnsolvable: false },
  { itemId: 97, scramble: "UOPGR", solution: "GROUP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 98, scramble: "RGDUA", solution: "GUARD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 99, scramble: "LTGIU", solution: "GUILT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 100, scramble: "ENHVA", solution: "HAVEN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 101, scramble: "COHVA", solution: "HAVOC", difficulty: "Hard", isUnsolvable: false },
  { itemId: 102, scramble: "EYHNO", solution: "HONEY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 103, scramble: "DEOHR", solution: "HORDE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 104, scramble: "DNHUO", solution: "HOUND", difficulty: "Hard", isUnsolvable: false },
  { itemId: 105, scramble: "SEHUO", solution: "HOUSE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 106, scramble: "ELHVO", solution: "HOVEL", difficulty: "Hard", isUnsolvable: false },
  { itemId: 107, scramble: "EANHY", solution: "HYENA", difficulty: "Hard", isUnsolvable: false },
  { itemId: 108, scramble: "ELRDI", solution: "IDLER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 109, scramble: "EDXNI", solution: "INDEX", difficulty: "Hard", isUnsolvable: false },
  { itemId: 110, scramble: "UPTNI", solution: "INPUT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 111, scramble: "EGJDU", solution: "JUDGE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 112, scramble: "ECJIU", solution: "JUICE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 113, scramble: "TNOJI", solution: "JOINT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 114, scramble: "AEVKN", solution: "KNAVE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 115, scramble: "EFNKI", solution: "KNIFE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 116, scramble: "HCLRA", solution: "LARCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 117, scramble: "HGTLI", solution: "LIGHT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 118, scramble: "BMOLI", solution: "LIMBO", difficulty: "Hard", isUnsolvable: false },
  { itemId: 119, scramble: "GCIOL", solution: "LOGIC", difficulty: "Hard", isUnsolvable: false },
  { itemId: 120, scramble: "VREOL", solution: "LOVER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 121, scramble: "CNHLU", solution: "LUNCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 122, scramble: "CIYLR", solution: "LYRIC", difficulty: "Hard", isUnsolvable: false },
  { itemId: 123, scramble: "OJRMA", solution: "MAJOR", difficulty: "Hard", isUnsolvable: false },
  { itemId: 124, scramble: "ERMKA", solution: "MAKER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 125, scramble: "HCMTA", solution: "MATCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 126, scramble: "LAEMD", solution: "MEDAL", difficulty: "Hard", isUnsolvable: false },
  { itemId: 127, scramble: "YCMRE", solution: "MERCY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 128, scramble: "EGMDI", solution: "MIDGE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 129, scramble: "ECMNI", solution: "MINCE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 130, scramble: "ERMNI", solution: "MINER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 131, scramble: "HTMRI", solution: "MIRTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 132, scramble: "EXRMI", solution: "MIXER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 133, scramble: "TNHMO", solution: "MONTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 134, scramble: "UHTMO", solution: "MOUTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 135, scramble: "MHPNY", solution: "NYMPH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 136, scramble: "RAOEP", solution: "OPERA", difficulty: "Hard", isUnsolvable: false },
  { itemId: 137, scramble: "IUOPM", solution: "OPIUM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 138, scramble: "IBTRO", solution: "ORBIT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 139, scramble: "CNEUO", solution: "OUNCE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 140, scramble: "RYVOA", solution: "OVARY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 141, scramble: "ICPNA", solution: "PANIC", difficulty: "Hard", isUnsolvable: false },
  { itemId: 142, scramble: "RHCPE", solution: "PERCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 143, scramble: "OLTPI", solution: "PILOT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 144, scramble: "HCPTI", solution: "PITCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 145, scramble: "OVTPI", solution: "PIVOT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 146, scramble: "LNPKA", solution: "PLANK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 147, scramble: "TNLPA", solution: "PLANT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 148, scramble: "UKCPL", solution: "PLUCK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 149, scramble: "EMLPU", solution: "PLUME", difficulty: "Hard", isUnsolvable: false },
  { itemId: 150, scramble: "RHCPO", solution: "PORCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 151, scramble: "NAKPR", solution: "PRANK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 152, scramble: "ANWPR", solution: "PRAWN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 153, scramble: "EZRPI", solution: "PRIZE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 154, scramble: "ENRPU", solution: "PRUNE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 155, scramble: "OLNPY", solution: "PYLON", difficulty: "Hard", isUnsolvable: false },
  { itemId: 156, scramble: "YRQEU", solution: "QUERY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 157, scramble: "TLQIU", solution: "QUILT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 158, scramble: "CNHRA", solution: "RANCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 159, scramble: "EMRYH", solution: "RHYME", difficulty: "Hard", isUnsolvable: false },
  { itemId: 160, scramble: "EVTIR", solution: "RIVET", difficulty: "Hard", isUnsolvable: false },
  { itemId: 161, scramble: "BGYUR", solution: "RUGBY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 162, scramble: "RFCSA", solution: "SCARF", difficulty: "Hard", isUnsolvable: false },
  { itemId: 163, scramble: "UOTCS", solution: "SCOUT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 164, scramble: "UMCSR", solution: "SCRUM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 165, scramble: "WLHSA", solution: "SHAWL", difficulty: "Hard", isUnsolvable: false },
  { itemId: 166, scramble: "KCNSA", solution: "SNACK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 167, scramble: "IUBQS", solution: "SQUIB", difficulty: "Hard", isUnsolvable: false },
  { itemId: 168, scramble: "ELSYT", solution: "STYLE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 169, scramble: "OPTME", solution: "TEMPO", difficulty: "Hard", isUnsolvable: false },
  { itemId: 170, scramble: "EFHTI", solution: "THIEF", difficulty: "Hard", isUnsolvable: false },
  { itemId: 171, scramble: "BMTUH", solution: "THUMB", difficulty: "Hard", isUnsolvable: false },
  { itemId: 172, scramble: "NETKO", solution: "TOKEN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 173, scramble: "APMRT", solution: "TRAMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 174, scramble: "EDNRT", solution: "TREND", difficulty: "Hard", isUnsolvable: false },
  { itemId: 175, scramble: "CIKTR", solution: "TRICK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 176, scramble: "UKCTR", solution: "TRUCK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 177, scramble: "UPMRT", solution: "TRUMP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 178, scramble: "PIUTL", solution: "TULIP", difficulty: "Hard", isUnsolvable: false },
  { itemId: 179, scramble: "LEUCN", solution: "UNCLE", difficulty: "Hard", isUnsolvable: false },
  { itemId: 180, scramble: "IYTNU", solution: "UNITY", difficulty: "Hard", isUnsolvable: false },
  { itemId: 181, scramble: "ETVLA", solution: "VALET", difficulty: "Hard", isUnsolvable: false },
  { itemId: 182, scramble: "LTVUA", solution: "VAULT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 183, scramble: "OMVNE", solution: "VENOM", difficulty: "Hard", isUnsolvable: false },
  { itemId: 184, scramble: "ARVCI", solution: "VICAR", difficulty: "Hard", isUnsolvable: false },
  { itemId: 185, scramble: "ERVPI", solution: "VIPER", difficulty: "Hard", isUnsolvable: false },
  { itemId: 186, scramble: "USVRI", solution: "VIRUS", difficulty: "Hard", isUnsolvable: false },
  { itemId: 187, scramble: "OSRVI", solution: "VISOR", difficulty: "Hard", isUnsolvable: false },
  { itemId: 188, scramble: "ATVSI", solution: "VISTA", difficulty: "Hard", isUnsolvable: false },
  { itemId: 189, scramble: "EXNVI", solution: "VIXEN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 190, scramble: "AKVDO", solution: "VODKA", difficulty: "Hard", isUnsolvable: false },
  { itemId: 191, scramble: "TLZWA", solution: "WALTZ", difficulty: "Hard", isUnsolvable: false },
  { itemId: 192, scramble: "HCWTA", solution: "WATCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 193, scramble: "CNHWE", solution: "WENCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 194, scramble: "RFHWA", solution: "WHARF", difficulty: "Hard", isUnsolvable: false },
  { itemId: 195, scramble: "AETHW", solution: "WHEAT", difficulty: "Hard", isUnsolvable: false },
  { itemId: 196, scramble: "TDHWI", solution: "WIDTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 197, scramble: "HCIWT", solution: "WITCH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 198, scramble: "ANWMO", solution: "WOMAN", difficulty: "Hard", isUnsolvable: false },
  { itemId: 199, scramble: "LRDWO", solution: "WORLD", difficulty: "Hard", isUnsolvable: false },
  { itemId: 200, scramble: "DNWUO", solution: "WOUND", difficulty: "Hard", isUnsolvable: false },
  { itemId: 201, scramble: "EKCWR", solution: "WRECK", difficulty: "Hard", isUnsolvable: false },
  { itemId: 202, scramble: "TUHYO", solution: "YOUTH", difficulty: "Hard", isUnsolvable: false },
  { itemId: 203, scramble: "UOTEB", solution: "EBOUT", difficulty: "Hard", isUnsolvable: true },
  { itemId: 204, scramble: "IBDCA", solution: "ACBID", difficulty: "Hard", isUnsolvable: true },
  { itemId: 205, scramble: "ITRMD", solution: "RDMIT", difficulty: "Hard", isUnsolvable: true },
  { itemId: 206, scramble: "PFDAO", solution: "ADOPF", difficulty: "Hard", isUnsolvable: true },
  { itemId: 207, scramble: "TRZFA", solution: "AFTZR", difficulty: "Hard", isUnsolvable: true },
  { itemId: 208, scramble: "IHVAL", solution: "ALIVH", difficulty: "Hard", isUnsolvable: true },
  { itemId: 209, scramble: "GEUIR", solution: "IRGUE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 210, scramble: "NOBCF", solution: "BFCON", difficulty: "Hard", isUnsolvable: true },
  { itemId: 211, scramble: "LWOES", solution: "SELOW", difficulty: "Hard", isUnsolvable: true },
  { itemId: 212, scramble: "KNLRA", solution: "RLANK", difficulty: "Hard", isUnsolvable: true },
  { itemId: 213, scramble: "ANIUR", solution: "URAIN", difficulty: "Hard", isUnsolvable: true },
  { itemId: 214, scramble: "KOESR", solution: "SROKE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 215, scramble: "AEPRH", solution: "RHEAP", difficulty: "Hard", isUnsolvable: true },
  { itemId: 216, scramble: "EFRIH", solution: "RHIEF", difficulty: "Hard", isUnsolvable: true },
  { itemId: 217, scramble: "CNPDA", solution: "DANCP", difficulty: "Hard", isUnsolvable: true },
  { itemId: 218, scramble: "GTFDR", solution: "DRGFT", difficulty: "Hard", isUnsolvable: true },
  { itemId: 219, scramble: "YWUDM", solution: "DUMWY", difficulty: "Hard", isUnsolvable: true },
  { itemId: 220, scramble: "OYNBA", solution: "ABONY", difficulty: "Hard", isUnsolvable: true },
  { itemId: 221, scramble: "OYAJN", solution: "ANJOY", difficulty: "Hard", isUnsolvable: true },
  { itemId: 222, scramble: "BSXEI", solution: "EXISB", difficulty: "Hard", isUnsolvable: true },
  { itemId: 223, scramble: "RAITX", solution: "IXTRA", difficulty: "Hard", isUnsolvable: true },
  { itemId: 224, scramble: "LEUIF", solution: "FIELU", difficulty: "Hard", isUnsolvable: true },
  { itemId: 225, scramble: "SRTIL", solution: "LIRST", difficulty: "Hard", isUnsolvable: true },
  { itemId: 226, scramble: "RODJS", solution: "SJORD", difficulty: "Hard", isUnsolvable: true },
  { itemId: 227, scramble: "UDPFL", solution: "FLUPD", difficulty: "Hard", isUnsolvable: true },
  { itemId: 228, scramble: "SUODC", solution: "DOCUS", difficulty: "Hard", isUnsolvable: true },
  { itemId: 229, scramble: "YDFUO", solution: "FOUYD", difficulty: "Hard", isUnsolvable: true },
  { itemId: 230, scramble: "OTGCE", solution: "GECTO", difficulty: "Hard", isUnsolvable: true },
  { itemId: 231, scramble: "NQTGI", solution: "GIQNT", difficulty: "Hard", isUnsolvable: true },
  { itemId: 232, scramble: "ACTGR", solution: "GRCAT", difficulty: "Hard", isUnsolvable: true },
  { itemId: 233, scramble: "RNOHP", solution: "HPRON", difficulty: "Hard", isUnsolvable: true },
  { itemId: 234, scramble: "GREOH", solution: "HORGE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 235, scramble: "AELDO", solution: "ODEAL", difficulty: "Hard", isUnsolvable: true },
  { itemId: 236, scramble: "UGMIA", solution: "IMAGU", difficulty: "Hard", isUnsolvable: true },
  { itemId: 237, scramble: "YLEPM", solution: "EMPLY", difficulty: "Hard", isUnsolvable: true },
  { itemId: 238, scramble: "BMOUR", solution: "RUMBO", difficulty: "Hard", isUnsolvable: true },
  { itemId: 239, scramble: "EUALR", solution: "LARUE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 240, scramble: "UHGRA", solution: "RAUGH", difficulty: "Hard", isUnsolvable: true },
  { itemId: 241, scramble: "RUNEL", solution: "LEURN", difficulty: "Hard", isUnsolvable: true },
  { itemId: 242, scramble: "GCILA", solution: "LAGIC", difficulty: "Hard", isUnsolvable: true },
  { itemId: 243, scramble: "OJMCI", solution: "MICJO", difficulty: "Hard", isUnsolvable: true },
  { itemId: 244, scramble: "EYRNO", solution: "RONEY", difficulty: "Hard", isUnsolvable: true },
  { itemId: 245, scramble: "SIERO", solution: "ROISE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 246, scramble: "SREUT", solution: "TURSE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 247, scramble: "HREJT", solution: "JTHER", difficulty: "Hard", isUnsolvable: true },
  { itemId: 248, scramble: "RYTPB", solution: "PBRTY", difficulty: "Hard", isUnsolvable: true },
  { itemId: 249, scramble: "OLXHR", solution: "RHLOX", difficulty: "Hard", isUnsolvable: true },
  { itemId: 250, scramble: "AEXLP", solution: "PLAXE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 251, scramble: "NTPIY", solution: "PYINT", difficulty: "Hard", isUnsolvable: true },
  { itemId: 252, scramble: "IJMRP", solution: "PRIMJ", difficulty: "Hard", isUnsolvable: true },
  { itemId: 253, scramble: "KAEUR", solution: "RUAKE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 254, scramble: "KCRIU", solution: "RUICK", difficulty: "Hard", isUnsolvable: true },
  { itemId: 255, scramble: "IJRDA", solution: "RADIJ", difficulty: "Hard", isUnsolvable: true },
  { itemId: 256, scramble: "YDSAE", solution: "SEADY", difficulty: "Hard", isUnsolvable: true },
  { itemId: 257, scramble: "IONHS", solution: "SHINO", difficulty: "Hard", isUnsolvable: true },
  { itemId: 258, scramble: "HGTDI", solution: "DIGHT", difficulty: "Hard", isUnsolvable: true },
  { itemId: 259, scramble: "AYLSO", solution: "SOYAL", difficulty: "Hard", isUnsolvable: true },
  { itemId: 260, scramble: "VYOAE", solution: "EAVOY", difficulty: "Hard", isUnsolvable: true },
  { itemId: 261, scramble: "LJCSA", solution: "SCALJ", difficulty: "Hard", isUnsolvable: true },
  { itemId: 262, scramble: "KCROH", solution: "RHOCK", difficulty: "Hard", isUnsolvable: true },
  { itemId: 263, scramble: "NUDSG", solution: "SGUND", difficulty: "Hard", isUnsolvable: true },
  { itemId: 264, scramble: "TUHOL", solution: "LOUTH", difficulty: "Hard", isUnsolvable: true },
  { itemId: 265, scramble: "WCSAP", solution: "SPACW", difficulty: "Hard", isUnsolvable: true },
  { itemId: 266, scramble: "AEKPR", solution: "RPEAK", difficulty: "Hard", isUnsolvable: true },
  { itemId: 267, scramble: "ILTPR", solution: "RPLIT", difficulty: "Hard", isUnsolvable: true },
  { itemId: 268, scramble: "GKTSA", solution: "STAGK", difficulty: "Hard", isUnsolvable: true },
  { itemId: 269, scramble: "OKCTR", solution: "RTOCK", difficulty: "Hard", isUnsolvable: true },
  { itemId: 270, scramble: "UYDTR", solution: "RTUDY", difficulty: "Hard", isUnsolvable: true },
  { itemId: 271, scramble: "RATGU", solution: "TUGAR", difficulty: "Hard", isUnsolvable: true },
  { itemId: 272, scramble: "JLATB", solution: "TABLJ", difficulty: "Hard", isUnsolvable: true },
  { itemId: 273, scramble: "AKNHR", solution: "RHANK", difficulty: "Hard", isUnsolvable: true },
  { itemId: 274, scramble: "EQIHT", solution: "THEIQ", difficulty: "Hard", isUnsolvable: true },
  { itemId: 275, scramble: "NKRIH", solution: "RHINK", difficulty: "Hard", isUnsolvable: true },
  { itemId: 276, scramble: "NETYH", solution: "THYNE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 277, scramble: "UHCRO", solution: "ROUCH", difficulty: "Hard", isUnsolvable: true },
  { itemId: 278, scramble: "AKCQT", solution: "TQACK", difficulty: "Hard", isUnsolvable: true },
  { itemId: 279, scramble: "IECWR", solution: "RWICE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 280, scramble: "OXABN", solution: "ANBOX", difficulty: "Hard", isUnsolvable: true },
  { itemId: 281, scramble: "EJRNU", solution: "UNJER", difficulty: "Hard", isUnsolvable: true },
  { itemId: 282, scramble: "BDARU", solution: "URBAD", difficulty: "Hard", isUnsolvable: true },
  { itemId: 283, scramble: "EORDI", solution: "RIDEO", difficulty: "Hard", isUnsolvable: true },
  { itemId: 284, scramble: "ATLSV", solution: "VSTAL", difficulty: "Hard", isUnsolvable: true },
  { itemId: 285, scramble: "TEWNA", solution: "WANTE", difficulty: "Hard", isUnsolvable: true },
  { itemId: 286, scramble: "ERZTA", solution: "ZATER", difficulty: "Hard", isUnsolvable: true },
  { itemId: 287, scramble: "DLRUO", solution: "ROULD", difficulty: "Hard", isUnsolvable: true },
  { itemId: 288, scramble: "IKTRW", solution: "WRITK", difficulty: "Hard", isUnsolvable: true },
  { itemId: 289, scramble: "EMRLY", solution: "RYLEM", difficulty: "Hard", isUnsolvable: true },
  { itemId: 290, scramble: "HSAYC", solution: "YACHS", difficulty: "Hard", isUnsolvable: true },
  { itemId: 291, scramble: "GNRUO", solution: "ROUNG", difficulty: "Hard", isUnsolvable: true },
  { itemId: 292, scramble: "EARZE", solution: "ZEERA", difficulty: "Hard", isUnsolvable: true },
  ],
};

// 3) Condition from URL and ITEMS array

const urlParams = new URLSearchParams(window.location.search);
const condition = urlParams.get("cond") || "Easy";

// Fisher–Yates shuffle (in-place)
function shuffleArray(arr) {
  const a = arr.slice(); // work on a copy, keep STIMULI unchanged
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build baseList depending on condition
let baseList;

if (condition === "MixedFutility") {
  const all = STIMULI["MixedFutility"] || [];
  const solvable = all.filter(stim => !stim.isUnsolvable);
  const unsolvable = all.filter(stim => stim.isUnsolvable);

  // Target mix: 75% solvable, 25% unsolvable (approx)
  const totalTarget = all.length; // 292 in your design
  const targetUnsolvable = Math.round(totalTarget * 0.25);
  const targetSolvable = totalTarget - targetUnsolvable;

  const chosenSolvable = shuffleArray(solvable).slice(0, Math.min(targetSolvable, solvable.length));
  const chosenUnsolvable = shuffleArray(unsolvable).slice(0, Math.min(targetUnsolvable, unsolvable.length));

  baseList = shuffleArray(chosenSolvable.concat(chosenUnsolvable));
} else {
  // Easy / Moderate / Hard: just shuffle the full list
  const pool = STIMULI[condition] || STIMULI["Easy"];
  baseList = shuffleArray(pool);
}

// Add trialIndex and condition to each stimulus
const ITEMS = baseList.map((stim, idx) => ({
  trialIndex: idx,
  condition: condition,
  ...stim,
}));


// 4) Global state
let trials = [];
let currentItemIndex = 0;

let attempts = 0;
let trialStartMs = Date.now();
let firstAttemptMs = null;
let finishedCurrentItem = false;
let skipTimerId = null;

// Global task timer state
let globalTaskTimeoutId = null;
let taskEndedByTime = false;

// Current editable row inputs
let currentRowInputs = [];

// 5) DOM references
const scrambleDiv = document.getElementById("scramble");
const boardDiv = document.getElementById("board");
const messageDiv = document.getElementById("message");
const skipBtn = document.getElementById("skipBtn");
const timerDiv = document.getElementById("timer");

// 6) Helper to get current item
function getCurrentItem() {
  return ITEMS[currentItemIndex];
}

// 7) Helper to send data to Qualtrics (or any parent frame) safely
function sendTaskDataToParent(reason) {
  const payload = {
    type: "ScrambleTaskComplete",
    reason, // "block_complete" or "time_limit"
    data: trials,
  };

  try {
    if (window.parent && window.parent !== window && typeof window.parent.postMessage === "function") {
      window.parent.postMessage(payload, "*");
    } else {
      console.log("No parent window for postMessage. Payload:", payload);
    }
  } catch (e) {
    console.error("postMessage failed:", e, payload);
  }
}

// 8) Build attempt rows
function createAttemptRow(readonly, letters) {
  const row = document.createElement("div");
  row.className = "attempt-row";

  const boxes = [];
  for (let i = 0; i < LETTERS_PER_WORD; i++) {
    const box = document.createElement("div");
    box.className = "letter-box";

    if (readonly) {
      box.classList.add("readonly");
      box.textContent = (letters && letters[i]) ? letters[i].toUpperCase() : "";
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.autocomplete = "off";

      input.addEventListener("keydown", (e) => {
        if (finishedCurrentItem || taskEndedByTime) return;

        const idx = boxes.indexOf(input);

        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmitAttempt();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (idx > 0) boxes[idx - 1].focus();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          if (idx < boxes.length - 1) boxes[idx + 1].focus();
        } else if (e.key === "Backspace") {
          e.preventDefault();
          if (input.value) {
            input.value = "";
          } else if (idx > 0) {
            boxes[idx - 1].value = "";
            boxes[idx - 1].focus();
          }
        } else if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
          e.preventDefault();
          input.value = e.key.toUpperCase();
          if (idx < boxes.length - 1) {
            boxes[idx + 1].focus();
          }
        }
      });

      box.appendChild(input);
      boxes.push(input);
    }

    row.appendChild(box);
  }

  boardDiv.appendChild(row);

  if (!readonly) {
    currentRowInputs = boxes;
    if (currentRowInputs[0]) currentRowInputs[0].focus();
  }
}

// 9) Trial start / next item
function startCurrentItem() {
  const item = getCurrentItem();
  boardDiv.innerHTML = "";
  messageDiv.textContent = "";
  attempts = 0;
  trialStartMs = Date.now();
  firstAttemptMs = null;
  finishedCurrentItem = false;
  skipBtn.style.display = "none";
  if (skipTimerId) {
    clearTimeout(skipTimerId);
    skipTimerId = null;
  }

  scrambleDiv.textContent = `Unscramble: ${item.scramble}`;
  createAttemptRow(false, null);
  startTimerDisplay();
}

function goToNextItemOrFinishBlock() {
  if (taskEndedByTime) return;

  currentItemIndex += 1;
  if (currentItemIndex >= ITEMS.length) {
    stopTimerDisplay();
    messageDiv.textContent = "Block complete.";
    console.log("All trials:", trials);
    sendTaskDataToParent("block_complete");
  } else {
    startCurrentItem();
  }
}

// 10) Get current guess
function getCurrentGuess() {
  if (!currentRowInputs || currentRowInputs.length !== LETTERS_PER_WORD) return null;
  let letters = currentRowInputs.map(inp => (inp.value || "").trim().toUpperCase());
  if (letters.some(l => l === "")) {
    return null;
  }
  return letters.join("");
}

// 11) Lock current row and keep only last attempt
function lockCurrentRow(guess) {
  const lastRow = boardDiv.lastElementChild;
  if (lastRow) boardDiv.removeChild(lastRow);

  const letters = guess.split("");
  createAttemptRow(true, letters);

  while (boardDiv.children.length > 1) {
    boardDiv.removeChild(boardDiv.firstElementChild);
  }
}

// 12) New editable row
function addNewAttemptRow() {
  createAttemptRow(false, null);
}

// 13) Finish current item
function finishCurrentItem({ response, correct, skipped }) {
  if (finishedCurrentItem || taskEndedByTime) return;
  finishedCurrentItem = true;

  const item = getCurrentItem();
  const endMs = Date.now();
  const rtMs = endMs - trialStartMs;

  const trialRecord = {
    trialIndex: item.trialIndex,
    itemId: item.itemId,
    scramble: item.scramble,
    solution: item.solution,
    difficulty: item.difficulty,
    condition: item.condition,
    isUnsolvable: item.isUnsolvable,
    response: response,
    correct: correct,
    skipped: skipped,
    rtMs: rtMs,
    attempts: attempts,
    timestampStart: new Date(trialStartMs).toISOString(),
    timestampEnd: new Date(endMs).toISOString(),
  };

  trials.push(trialRecord);

  messageDiv.textContent = correct
    ? "Correct! Moving to next anagram..."
    : "Moving to next anagram...";
  stopTimerDisplay();

  console.log("Trial complete:", trialRecord);

  setTimeout(() => {
    goToNextItemOrFinishBlock();
  }, 800);
}

// 14) Handle submission of an attempt
function handleSubmitAttempt() {
  if (finishedCurrentItem || taskEndedByTime) return;

  const guess = getCurrentGuess();
  if (!guess) {
    messageDiv.textContent = "Please fill all 5 letters before submitting.";
    return;
  }
  attempts += 1;

  if (!firstAttemptMs) {
    firstAttemptMs = Date.now();
    skipTimerId = setTimeout(() => {
      if (!finishedCurrentItem && !taskEndedByTime) {
        skipBtn.style.display = "inline-block";
      }
    }, SKIP_DELAY_MS);
  }

  lockCurrentRow(guess);

  const item = getCurrentItem();
  if (!item.isUnsolvable && guess === item.solution.toUpperCase()) {
    finishCurrentItem({ response: guess, correct: true, skipped: false });
  } else {
    messageDiv.textContent =
      "That is not correct. Try again or use Skip if you cannot solve this one.";
    addNewAttemptRow();
  }
}

// 15) Skip logic
skipBtn.addEventListener("click", () => {
  if (finishedCurrentItem || taskEndedByTime) return;
  const guess = getCurrentGuess() || "";
  attempts += 1;
  finishCurrentItem({ response: guess, correct: false, skipped: true });
});

// 16) On-screen timer (per item)
let timerIntervalId = null;

function startTimerDisplay() {
  if (timerIntervalId) clearInterval(timerIntervalId);
  timerIntervalId = setInterval(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - trialStartMs) / 1000);
    timerDiv.textContent = `Time: ${elapsed}s`;
  }, 1000);
}

function stopTimerDisplay() {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
}

// 17) Global task timer
function startGlobalTaskTimer() {
  globalTaskTimeoutId = setTimeout(() => {
    taskEndedByTime = true;
    endTaskDueToTime();
  }, TOTAL_TASK_MS);
}

function endTaskDueToTime() {
  finishedCurrentItem = true;
  skipBtn.style.display = "none";
  stopTimerDisplay();

  if (skipTimerId) {
    clearTimeout(skipTimerId);
    skipTimerId = null;
  }

  messageDiv.textContent = "Task complete.";
  console.log("Task ended by global time limit.", { trials });

  sendTaskDataToParent("time_limit");
}

// 18) Start the first item and the global task timer
startCurrentItem();
startGlobalTaskTimer();
