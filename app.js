// 1) Configuration
const LETTERS_PER_WORD = 5;
const SKIP_DELAY_MS = 3000; // 3 seconds before Skip appears after first attempt
const TOTAL_TASK_MS = 15 * 60 * 1000; // 15 minute task timer
const HARD_SET_SIZE = 200; // Number of items in each randomized Hard set
const HARD_UNSOLVABLE_PROPORTION = 0.25; // Proportion of each Hard set that is unsolvable


// 2) Stimuli
const STIMULI = {
  Easy: [
{ itemId: 1, scramble: "CHIAR", solution: "CHAIR", difficulty: "Easy", isUnsolvable: false },
{ itemId: 2, scramble: "CONUT", solution: "COUNT", difficulty: "Easy", isUnsolvable: false },
{ itemId: 3, scramble: "FRNOT", solution: "FRONT", difficulty: "Easy", isUnsolvable: false },
{ itemId: 4, scramble: "FRIUT", solution: "FRUIT", difficulty: "Easy", isUnsolvable: false },
{ itemId: 5, scramble: "LIHGT", solution: "LIGHT", difficulty: "Easy", isUnsolvable: false },
{ itemId: 6, scramble: "LUCNH", solution: "LUNCH", difficulty: "Easy", isUnsolvable: false },
{ itemId: 7, scramble: "MACTH", solution: "MATCH", difficulty: "Easy", isUnsolvable: false },
{ itemId: 8, scramble: "MOTUH", solution: "MOUTH", difficulty: "Easy", isUnsolvable: false },
{ itemId: 9, scramble: "PIOLT", solution: "PILOT", difficulty: "Easy", isUnsolvable: false },
{ itemId: 10, scramble: "PLNAT", solution: "PLANT", difficulty: "Easy", isUnsolvable: false },
{ itemId: 11, scramble: "STLYE", solution: "STYLE", difficulty: "Easy", isUnsolvable: false },
{ itemId: 12, scramble: "TRNED", solution: "TREND", difficulty: "Easy", isUnsolvable: false },
{ itemId: 13, scramble: "UNLCE", solution: "UNCLE", difficulty: "Easy", isUnsolvable: false },
{ itemId: 14, scramble: "WACTH", solution: "WATCH", difficulty: "Easy", isUnsolvable: false },
{ itemId: 15, scramble: "WOAMN", solution: "WOMAN", difficulty: "Easy", isUnsolvable: false },

  ],
  Moderate: [
{ itemId: 1, scramble: "OGNYA", solution: "AGONY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 2, scramble: "ULBMA", solution: "ALBUM", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 3, scramble: "NELAK", solution: "ANKLE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 4, scramble: "PORNA", solution: "APRON", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 5, scramble: "NABOJ", solution: "BANJO", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 6, scramble: "HATBC", solution: "BATCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 7, scramble: "NTOAB", solution: "BATON", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 8, scramble: "ENBHC", solution: "BENCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 9, scramble: "THRBE", solution: "BERTH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 10, scramble: "IRBHC", solution: "BIRCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 11, scramble: "KABLC", solution: "BLACK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 12, scramble: "LBDEA", solution: "BLADE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 13, scramble: "ZLAEB", solution: "BLAZE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 14, scramble: "PLMBI", solution: "BLIMP", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 15, scramble: "CLKOB", solution: "BLOCK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 16, scramble: "RDNAB", solution: "BRAND", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 17, scramble: "RALWB", solution: "BRAWL", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 18, scramble: "RIKCB", solution: "BRICK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 19, scramble: "RBNEI", solution: "BRINE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 20, scramble: "KNRIB", solution: "BRINK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 21, scramble: "NBUHC", solution: "BUNCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 22, scramble: "YERUB", solution: "BUYER", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 23, scramble: "BANCI", solution: "CABIN", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 24, scramble: "BECLA", solution: "CABLE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 25, scramble: "INCAR", solution: "CAIRN", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 26, scramble: "IRACH", solution: "CHAIR", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 27, scramble: "AHLKC", solution: "CHALK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 28, scramble: "ICLDH", solution: "CHILD", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 29, scramble: "HECIM", solution: "CHIME", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 30, scramble: "HMPIC", solution: "CHIMP", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 31, scramble: "DHCRO", solution: "CHORD", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 32, scramble: "UMPCH", solution: "CHUMP", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 33, scramble: "NKHUC", solution: "CHUNK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 34, scramble: "MCAPL", solution: "CLAMP", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 35, scramble: "SLAHC", solution: "CLASH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 36, scramble: "KECRL", solution: "CLERK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 37, scramble: "KACLO", solution: "CLOAK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 38, scramble: "HCLTO", solution: "CLOTH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 39, scramble: "LWONC", solution: "CLOWN", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 40, scramble: "GOIRC", solution: "CORGI", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 41, scramble: "UNTCO", solution: "COUNT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 42, scramble: "HOGUC", solution: "COUGH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 43, scramble: "EOVRC", solution: "COVER", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 44, scramble: "AFTCR", solution: "CRAFT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 45, scramble: "PCAMR", solution: "CRAMP", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 46, scramble: "NRAKC", solution: "CRANK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 47, scramble: "REACZ", solution: "CRAZE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 48, scramble: "OFRTC", solution: "CROFT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 49, scramble: "RDWOC", solution: "CROWD", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 50, scramble: "BURMC", solution: "CRUMB", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 51, scramble: "SCHRU", solution: "CRUSH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 52, scramble: "RTCYP", solution: "CRYPT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 53, scramble: "NOMED", solution: "DEMON", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 54, scramble: "PHETD", solution: "DEPTH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 55, scramble: "TDVOI", solution: "DIVOT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 56, scramble: "BTUDO", solution: "DOUBT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 57, scramble: "LAWRD", solution: "DRAWL", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 58, scramble: "NKIDR", solution: "DRINK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 59, scramble: "KNURD", solution: "DRUNK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 60, scramble: "CENUD", solution: "DUNCE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 61, scramble: "NYERT", solution: "ENTRY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 62, scramble: "IRYAF", solution: "FAIRY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 63, scramble: "HTAIF", solution: "FAITH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 64, scramble: "YCANF", solution: "FANCY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 65, scramble: "LAUTF", solution: "FAULT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 66, scramble: "THFIG", solution: "FIGHT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 67, scramble: "IFHLT", solution: "FILTH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 68, scramble: "ICHNF", solution: "FINCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 69, scramble: "EAFLK", solution: "FLAKE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 70, scramble: "ELFMA", solution: "FLAME", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 71, scramble: "NKALF", solution: "FLANK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 72, scramble: "HLSAF", solution: "FLASH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 73, scramble: "KSALF", solution: "FLASK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 74, scramble: "TRIFL", solution: "FLIRT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 75, scramble: "LKEFU", solution: "FLUKE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 76, scramble: "ERCOF", solution: "FORCE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 77, scramble: "OFUMR", solution: "FORUM", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 78, scramble: "AOFVE", solution: "FOVEA", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 79, scramble: "DAFRU", solution: "FRAUD", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 80, scramble: "NOFTR", solution: "FRONT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 81, scramble: "WFRNO", solution: "FROWN", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 82, scramble: "URITF", solution: "FRUIT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 83, scramble: "AUEZG", solution: "GAUZE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 84, scramble: "NDAGL", solution: "GLAND", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 85, scramble: "LAMEG", solution: "GLEAM", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 86, scramble: "LIGTN", solution: "GLINT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 87, scramble: "YOGRL", solution: "GLORY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 88, scramble: "VOLEG", solution: "GLOVE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 89, scramble: "EGNMO", solution: "GNOME", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 90, scramble: "RFTAG", solution: "GRAFT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 91, scramble: "NTRAG", solution: "GRANT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 92, scramble: "HAPRG", solution: "GRAPH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 93, scramble: "ERGVA", solution: "GRAVE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 94, scramble: "EFIGR", solution: "GRIEF", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 95, scramble: "POURG", solution: "GROUP", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 96, scramble: "DARUG", solution: "GUARD", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 97, scramble: "TILUG", solution: "GUILT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 98, scramble: "NEHAV", solution: "HAVEN", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 99, scramble: "AVHCO", solution: "HAVOC", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 100, scramble: "YEHON", solution: "HONEY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 101, scramble: "DOHER", solution: "HORDE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 102, scramble: "UNDHO", solution: "HOUND", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 103, scramble: "OESHU", solution: "HOUSE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 104, scramble: "LEHOV", solution: "HOVEL", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 105, scramble: "YAHEN", solution: "HYENA", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 106, scramble: "DERIL", solution: "IDLER", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 107, scramble: "NXDEI", solution: "INDEX", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 108, scramble: "NTUIP", solution: "INPUT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 109, scramble: "DGUEJ", solution: "JUDGE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 110, scramble: "CEIJU", solution: "JUICE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 111, scramble: "ONTIJ", solution: "JOINT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 112, scramble: "NKEVA", solution: "KNAVE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 113, scramble: "FENIK", solution: "KNIFE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 114, scramble: "CHLAR", solution: "LARCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 115, scramble: "GHITL", solution: "LIGHT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 116, scramble: "MILOB", solution: "LIMBO", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 117, scramble: "GLICO", solution: "LOGIC", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 118, scramble: "OLRVE", solution: "LOVER", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 119, scramble: "CLHUN", solution: "LUNCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 120, scramble: "ICRLY", solution: "LYRIC", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 121, scramble: "RMOAJ", solution: "MAJOR", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 122, scramble: "EMARK", solution: "MAKER", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 123, scramble: "HTAMC", solution: "MATCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 124, scramble: "LDEMA", solution: "MEDAL", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 125, scramble: "YEMRC", solution: "MERCY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 126, scramble: "EDGIM", solution: "MIDGE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 127, scramble: "CIMEN", solution: "MINCE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 128, scramble: "NERMI", solution: "MINER", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 129, scramble: "IHRTM", solution: "MIRTH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 130, scramble: "XMERI", solution: "MIXER", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 131, scramble: "HTMON", solution: "MONTH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 132, scramble: "UOHTM", solution: "MOUTH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 133, scramble: "PHYMN", solution: "NYMPH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 134, scramble: "ERAPO", solution: "OPERA", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 135, scramble: "IMPOU", solution: "OPIUM", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 136, scramble: "BROTI", solution: "ORBIT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 137, scramble: "ENOUC", solution: "OUNCE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 138, scramble: "VAYOR", solution: "OVARY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 139, scramble: "CAINP", solution: "PANIC", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 140, scramble: "CRPHE", solution: "PERCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 141, scramble: "TPLOI", solution: "PILOT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 142, scramble: "HTCIP", solution: "PITCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 143, scramble: "VOPTI", solution: "PIVOT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 144, scramble: "LPAKN", solution: "PLANK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 145, scramble: "ANTLP", solution: "PLANT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 146, scramble: "ULKCP", solution: "PLUCK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 147, scramble: "MELUP", solution: "PLUME", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 148, scramble: "OCHRP", solution: "PORCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 149, scramble: "NKARP", solution: "PRANK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 150, scramble: "WARNP", solution: "PRAWN", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 151, scramble: "IZERP", solution: "PRIZE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 152, scramble: "UNREP", solution: "PRUNE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 153, scramble: "YLNOP", solution: "PYLON", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 154, scramble: "YUQER", solution: "QUERY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 155, scramble: "ULTIQ", solution: "QUILT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 156, scramble: "HACRN", solution: "RANCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 157, scramble: "MERHY", solution: "RHYME", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 158, scramble: "TREIV", solution: "RIVET", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 159, scramble: "BRYUG", solution: "RUGBY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 160, scramble: "CRAFS", solution: "SCARF", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 161, scramble: "TOUSC", solution: "SCOUT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 162, scramble: "RUMSC", solution: "SCRUM", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 163, scramble: "LSWAH", solution: "SHAWL", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 164, scramble: "ANKSC", solution: "SNACK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 165, scramble: "IBSQU", solution: "SQUIB", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 166, scramble: "LSETY", solution: "STYLE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 167, scramble: "OMPET", solution: "TEMPO", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 168, scramble: "IEFTH", solution: "THIEF", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 169, scramble: "HMBUT", solution: "THUMB", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 170, scramble: "KNOTE", solution: "TOKEN", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 171, scramble: "RAPMT", solution: "TRAMP", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 172, scramble: "NTRDE", solution: "TREND", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 173, scramble: "KITCR", solution: "TRICK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 174, scramble: "RCKUT", solution: "TRUCK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 175, scramble: "RUPMT", solution: "TRUMP", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 176, scramble: "PLUIT", solution: "TULIP", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 177, scramble: "LNCEU", solution: "UNCLE", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 178, scramble: "NIUYT", solution: "UNITY", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 179, scramble: "TEVAL", solution: "VALET", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 180, scramble: "TAUVL", solution: "VAULT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 181, scramble: "MONVE", solution: "VENOM", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 182, scramble: "CRIVA", solution: "VICAR", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 183, scramble: "REPIV", solution: "VIPER", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 184, scramble: "SURVI", solution: "VIRUS", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 185, scramble: "RSIVO", solution: "VISOR", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 186, scramble: "TSIAV", solution: "VISTA", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 187, scramble: "INVEX", solution: "VIXEN", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 188, scramble: "KOVAD", solution: "VODKA", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 189, scramble: "LTZAW", solution: "WALTZ", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 190, scramble: "ATHCW", solution: "WATCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 191, scramble: "CHNEW", solution: "WENCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 192, scramble: "FHWAR", solution: "WHARF", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 193, scramble: "ATHEW", solution: "WHEAT", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 194, scramble: "IWHDT", solution: "WIDTH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 195, scramble: "HICTW", solution: "WITCH", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 196, scramble: "MAWNO", solution: "WOMAN", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 197, scramble: "DWOLR", solution: "WORLD", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 198, scramble: "UNDWO", solution: "WOUND", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 199, scramble: "ERKCW", solution: "WRECK", difficulty: "Moderate", isUnsolvable: false },
{ itemId: 200, scramble: "OTHUY", solution: "YOUTH", difficulty: "Moderate", isUnsolvable: false },
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
{ itemId: 10, scramble: "RHCBI", solution: "BIRCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 11, scramble: "KCBAL", solution: "BLACK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 12, scramble: "AEDBL", solution: "BLADE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 13, scramble: "AEZLB", solution: "BLAZE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 14, scramble: "IPMLB", solution: "BLIMP", difficulty: "Hard", isUnsolvable: false },
{ itemId: 15, scramble: "OKCBL", solution: "BLOCK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 16, scramble: "DNBAR", solution: "BRAND", difficulty: "Hard", isUnsolvable: false },
{ itemId: 17, scramble: "LWBAR", solution: "BRAWL", difficulty: "Hard", isUnsolvable: false },
{ itemId: 18, scramble: "IKCBR", solution: "BRICK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 19, scramble: "ENBIR", solution: "BRINE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 20, scramble: "NIKBR", solution: "BRINK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 21, scramble: "CNHBU", solution: "BUNCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 22, scramble: "REBYU", solution: "BUYER", difficulty: "Hard", isUnsolvable: false },
{ itemId: 23, scramble: "NIACB", solution: "CABIN", difficulty: "Hard", isUnsolvable: false },
{ itemId: 24, scramble: "ELCBA", solution: "CABLE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 25, scramble: "NRCIA", solution: "CAIRN", difficulty: "Hard", isUnsolvable: false },
{ itemId: 26, scramble: "RIHCA", solution: "CHAIR", difficulty: "Hard", isUnsolvable: false },
{ itemId: 27, scramble: "KLHCA", solution: "CHALK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 28, scramble: "DLHCI", solution: "CHILD", difficulty: "Hard", isUnsolvable: false },
{ itemId: 29, scramble: "EMHCI", solution: "CHIME", difficulty: "Hard", isUnsolvable: false },
{ itemId: 30, scramble: "PMHCI", solution: "CHIMP", difficulty: "Hard", isUnsolvable: false },
{ itemId: 31, scramble: "RODHC", solution: "CHORD", difficulty: "Hard", isUnsolvable: false },
{ itemId: 32, scramble: "PMHCU", solution: "CHUMP", difficulty: "Hard", isUnsolvable: false },
{ itemId: 33, scramble: "UKNHC", solution: "CHUNK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 34, scramble: "APMLC", solution: "CLAMP", difficulty: "Hard", isUnsolvable: false },
{ itemId: 35, scramble: "SAHCL", solution: "CLASH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 36, scramble: "EKRLC", solution: "CLERK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 37, scramble: "AOKCL", solution: "CLOAK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 38, scramble: "TOHCL", solution: "CLOTH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 39, scramble: "NWCOL", solution: "CLOWN", difficulty: "Hard", isUnsolvable: false },
{ itemId: 40, scramble: "IGCRO", solution: "CORGI", difficulty: "Hard", isUnsolvable: false },
{ itemId: 41, scramble: "TNCUO", solution: "COUNT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 42, scramble: "UHGCO", solution: "COUGH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 43, scramble: "REOCV", solution: "COVER", difficulty: "Hard", isUnsolvable: false },
{ itemId: 44, scramble: "ATFCR", solution: "CRAFT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 45, scramble: "APMRC", solution: "CRAMP", difficulty: "Hard", isUnsolvable: false },
{ itemId: 46, scramble: "AKCNR", solution: "CRANK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 47, scramble: "AEZRC", solution: "CRAZE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 48, scramble: "OTFCR", solution: "CROFT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 49, scramble: "RWCDO", solution: "CROWD", difficulty: "Hard", isUnsolvable: false },
{ itemId: 50, scramble: "UBMRC", solution: "CRUMB", difficulty: "Hard", isUnsolvable: false },
{ itemId: 51, scramble: "UHSRC", solution: "CRUSH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 52, scramble: "YTPCR", solution: "CRYPT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 53, scramble: "NMDEO", solution: "DEMON", difficulty: "Hard", isUnsolvable: false },
{ itemId: 54, scramble: "TPHDE", solution: "DEPTH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 55, scramble: "OVTDI", solution: "DIVOT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 56, scramble: "TBDUO", solution: "DOUBT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 57, scramble: "WLRDA", solution: "DRAWL", difficulty: "Hard", isUnsolvable: false },
{ itemId: 58, scramble: "NIKDR", solution: "DRINK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 59, scramble: "NUKDR", solution: "DRUNK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 60, scramble: "ECDNU", solution: "DUNCE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 61, scramble: "YRETN", solution: "ENTRY", difficulty: "Hard", isUnsolvable: false },
{ itemId: 62, scramble: "RIYFA", solution: "FAIRY", difficulty: "Hard", isUnsolvable: false },
{ itemId: 63, scramble: "TIHFA", solution: "FAITH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 64, scramble: "YCFNA", solution: "FANCY", difficulty: "Hard", isUnsolvable: false },
{ itemId: 65, scramble: "LTFUA", solution: "FAULT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 66, scramble: "HGTFI", solution: "FIGHT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 67, scramble: "TLHFI", solution: "FILTH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 68, scramble: "HCFNI", solution: "FINCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 69, scramble: "AEKFL", solution: "FLAKE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 70, scramble: "AEMLF", solution: "FLAME", difficulty: "Hard", isUnsolvable: false },
{ itemId: 71, scramble: "AKFNL", solution: "FLANK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 72, scramble: "AHSFL", solution: "FLASH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 73, scramble: "SAKFL", solution: "FLASK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 74, scramble: "ITFLR", solution: "FLIRT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 75, scramble: "UEKFL", solution: "FLUKE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 76, scramble: "ECFRO", solution: "FORCE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 77, scramble: "UOFMR", solution: "FORUM", difficulty: "Hard", isUnsolvable: false },
{ itemId: 78, scramble: "AEOFV", solution: "FOVEA", difficulty: "Hard", isUnsolvable: false },
{ itemId: 79, scramble: "UADFR", solution: "FRAUD", difficulty: "Hard", isUnsolvable: false },
{ itemId: 80, scramble: "TNRFO", solution: "FRONT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 81, scramble: "OFNRW", solution: "FROWN", difficulty: "Hard", isUnsolvable: false },
{ itemId: 82, scramble: "IUTFR", solution: "FRUIT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 83, scramble: "EZGUA", solution: "GAUZE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 84, scramble: "DNLGA", solution: "GLAND", difficulty: "Hard", isUnsolvable: false },
{ itemId: 85, scramble: "AEMLG", solution: "GLEAM", difficulty: "Hard", isUnsolvable: false },
{ itemId: 86, scramble: "TNLGI", solution: "GLINT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 87, scramble: "OYRLG", solution: "GLORY", difficulty: "Hard", isUnsolvable: false },
{ itemId: 88, scramble: "OEVLG", solution: "GLOVE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 89, scramble: "OEMGN", solution: "GNOME", difficulty: "Hard", isUnsolvable: false },
{ itemId: 90, scramble: "ATFGR", solution: "GRAFT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 91, scramble: "TNRGA", solution: "GRANT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 92, scramble: "AHPGR", solution: "GRAPH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 93, scramble: "AEVGR", solution: "GRAVE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 94, scramble: "EFGIR", solution: "GRIEF", difficulty: "Hard", isUnsolvable: false },
{ itemId: 95, scramble: "UOPGR", solution: "GROUP", difficulty: "Hard", isUnsolvable: false },
{ itemId: 96, scramble: "RGDUA", solution: "GUARD", difficulty: "Hard", isUnsolvable: false },
{ itemId: 97, scramble: "LTGIU", solution: "GUILT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 98, scramble: "ENHVA", solution: "HAVEN", difficulty: "Hard", isUnsolvable: false },
{ itemId: 99, scramble: "COHVA", solution: "HAVOC", difficulty: "Hard", isUnsolvable: false },
{ itemId: 100, scramble: "EYHNO", solution: "HONEY", difficulty: "Hard", isUnsolvable: false },
{ itemId: 101, scramble: "DEOHR", solution: "HORDE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 102, scramble: "DNHUO", solution: "HOUND", difficulty: "Hard", isUnsolvable: false },
{ itemId: 103, scramble: "SEHUO", solution: "HOUSE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 104, scramble: "ELHVO", solution: "HOVEL", difficulty: "Hard", isUnsolvable: false },
{ itemId: 105, scramble: "AEYHN", solution: "HYENA", difficulty: "Hard", isUnsolvable: false },
{ itemId: 106, scramble: "ELRDI", solution: "IDLER", difficulty: "Hard", isUnsolvable: false },
{ itemId: 107, scramble: "EDXNI", solution: "INDEX", difficulty: "Hard", isUnsolvable: false },
{ itemId: 108, scramble: "UPTNI", solution: "INPUT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 109, scramble: "EGJDU", solution: "JUDGE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 110, scramble: "ECJIU", solution: "JUICE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 111, scramble: "TNOJI", solution: "JOINT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 112, scramble: "AEVKN", solution: "KNAVE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 113, scramble: "EFNKI", solution: "KNIFE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 114, scramble: "HCLRA", solution: "LARCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 115, scramble: "HGTLI", solution: "LIGHT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 116, scramble: "BMOLI", solution: "LIMBO", difficulty: "Hard", isUnsolvable: false },
{ itemId: 117, scramble: "GCIOL", solution: "LOGIC", difficulty: "Hard", isUnsolvable: false },
{ itemId: 118, scramble: "VLREO", solution: "LOVER", difficulty: "Hard", isUnsolvable: false },
{ itemId: 119, scramble: "CNHLU", solution: "LUNCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 120, scramble: "CIYLR", solution: "LYRIC", difficulty: "Hard", isUnsolvable: false },
{ itemId: 121, scramble: "OJRMA", solution: "MAJOR", difficulty: "Hard", isUnsolvable: false },
{ itemId: 122, scramble: "ERMKA", solution: "MAKER", difficulty: "Hard", isUnsolvable: false },
{ itemId: 123, scramble: "HCMTA", solution: "MATCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 124, scramble: "LAEMD", solution: "MEDAL", difficulty: "Hard", isUnsolvable: false },
{ itemId: 125, scramble: "YCMRE", solution: "MERCY", difficulty: "Hard", isUnsolvable: false },
{ itemId: 126, scramble: "EGMDI", solution: "MIDGE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 127, scramble: "ECMNI", solution: "MINCE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 128, scramble: "NMRIE", solution: "MINER", difficulty: "Hard", isUnsolvable: false },
{ itemId: 129, scramble: "HTMRI", solution: "MIRTH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 130, scramble: "EXRMI", solution: "MIXER", difficulty: "Hard", isUnsolvable: false },
{ itemId: 131, scramble: "TNHMO", solution: "MONTH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 132, scramble: "UHTMO", solution: "MOUTH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 133, scramble: "MHPNY", solution: "NYMPH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 134, scramble: "RAOEP", solution: "OPERA", difficulty: "Hard", isUnsolvable: false },
{ itemId: 135, scramble: "IMUOP", solution: "OPIUM", difficulty: "Hard", isUnsolvable: false },
{ itemId: 136, scramble: "IBTRO", solution: "ORBIT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 137, scramble: "CNEUO", solution: "OUNCE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 138, scramble: "AOYVR", solution: "OVARY", difficulty: "Hard", isUnsolvable: false },
{ itemId: 139, scramble: "ICPNA", solution: "PANIC", difficulty: "Hard", isUnsolvable: false },
{ itemId: 140, scramble: "RHCPE", solution: "PERCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 141, scramble: "OLTPI", solution: "PILOT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 142, scramble: "HCPTI", solution: "PITCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 143, scramble: "OVTPI", solution: "PIVOT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 144, scramble: "LNPKA", solution: "PLANK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 145, scramble: "TNLPA", solution: "PLANT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 146, scramble: "UKCPL", solution: "PLUCK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 147, scramble: "EMLPU", solution: "PLUME", difficulty: "Hard", isUnsolvable: false },
{ itemId: 148, scramble: "RHCPO", solution: "PORCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 149, scramble: "NAKPR", solution: "PRANK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 150, scramble: "ANWPR", solution: "PRAWN", difficulty: "Hard", isUnsolvable: false },
{ itemId: 151, scramble: "EZRPI", solution: "PRIZE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 152, scramble: "EUPNR", solution: "PRUNE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 153, scramble: "OLNPY", solution: "PYLON", difficulty: "Hard", isUnsolvable: false },
{ itemId: 154, scramble: "YRQEU", solution: "QUERY", difficulty: "Hard", isUnsolvable: false },
{ itemId: 155, scramble: "TLQIU", solution: "QUILT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 156, scramble: "CNHRA", solution: "RANCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 157, scramble: "EMRYH", solution: "RHYME", difficulty: "Hard", isUnsolvable: false },
{ itemId: 158, scramble: "EVTIR", solution: "RIVET", difficulty: "Hard", isUnsolvable: false },
{ itemId: 159, scramble: "BGYUR", solution: "RUGBY", difficulty: "Hard", isUnsolvable: false },
{ itemId: 160, scramble: "RFCSA", solution: "SCARF", difficulty: "Hard", isUnsolvable: false },
{ itemId: 161, scramble: "UOTCS", solution: "SCOUT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 162, scramble: "UMCSR", solution: "SCRUM", difficulty: "Hard", isUnsolvable: false },
{ itemId: 163, scramble: "WLHSA", solution: "SHAWL", difficulty: "Hard", isUnsolvable: false },
{ itemId: 164, scramble: "KCNSA", solution: "SNACK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 165, scramble: "IUBQS", solution: "SQUIB", difficulty: "Hard", isUnsolvable: false },
{ itemId: 166, scramble: "ELSYT", solution: "STYLE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 167, scramble: "OPTME", solution: "TEMPO", difficulty: "Hard", isUnsolvable: false },
{ itemId: 168, scramble: "EFHTI", solution: "THIEF", difficulty: "Hard", isUnsolvable: false },
{ itemId: 169, scramble: "BMTUH", solution: "THUMB", difficulty: "Hard", isUnsolvable: false },
{ itemId: 170, scramble: "NETKO", solution: "TOKEN", difficulty: "Hard", isUnsolvable: false },
{ itemId: 171, scramble: "APMRT", solution: "TRAMP", difficulty: "Hard", isUnsolvable: false },
{ itemId: 172, scramble: "EDTNR", solution: "TREND", difficulty: "Hard", isUnsolvable: false },
{ itemId: 173, scramble: "CIKTR", solution: "TRICK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 174, scramble: "UKCTR", solution: "TRUCK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 175, scramble: "UPMRT", solution: "TRUMP", difficulty: "Hard", isUnsolvable: false },
{ itemId: 176, scramble: "PIUTL", solution: "TULIP", difficulty: "Hard", isUnsolvable: false },
{ itemId: 177, scramble: "LEUCN", solution: "UNCLE", difficulty: "Hard", isUnsolvable: false },
{ itemId: 178, scramble: "IYTNU", solution: "UNITY", difficulty: "Hard", isUnsolvable: false },
{ itemId: 179, scramble: "ETVLA", solution: "VALET", difficulty: "Hard", isUnsolvable: false },
{ itemId: 180, scramble: "LTVUA", solution: "VAULT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 181, scramble: "OMVNE", solution: "VENOM", difficulty: "Hard", isUnsolvable: false },
{ itemId: 182, scramble: "ARVCI", solution: "VICAR", difficulty: "Hard", isUnsolvable: false },
{ itemId: 183, scramble: "ERVPI", solution: "VIPER", difficulty: "Hard", isUnsolvable: false },
{ itemId: 184, scramble: "IUVSR", solution: "VIRUS", difficulty: "Hard", isUnsolvable: false },
{ itemId: 185, scramble: "OSRVI", solution: "VISOR", difficulty: "Hard", isUnsolvable: false },
{ itemId: 186, scramble: "ATVSI", solution: "VISTA", difficulty: "Hard", isUnsolvable: false },
{ itemId: 187, scramble: "EXNVI", solution: "VIXEN", difficulty: "Hard", isUnsolvable: false },
{ itemId: 188, scramble: "AKVDO", solution: "VODKA", difficulty: "Hard", isUnsolvable: false },
{ itemId: 189, scramble: "TLZWA", solution: "WALTZ", difficulty: "Hard", isUnsolvable: false },
{ itemId: 190, scramble: "HCWTA", solution: "WATCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 191, scramble: "CNHWE", solution: "WENCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 192, scramble: "RFHWA", solution: "WHARF", difficulty: "Hard", isUnsolvable: false },
{ itemId: 193, scramble: "AETHW", solution: "WHEAT", difficulty: "Hard", isUnsolvable: false },
{ itemId: 194, scramble: "TDHWI", solution: "WIDTH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 195, scramble: "HCIWT", solution: "WITCH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 196, scramble: "ANWMO", solution: "WOMAN", difficulty: "Hard", isUnsolvable: false },
{ itemId: 197, scramble: "LRDWO", solution: "WORLD", difficulty: "Hard", isUnsolvable: false },
{ itemId: 198, scramble: "DNWUO", solution: "WOUND", difficulty: "Hard", isUnsolvable: false },
{ itemId: 199, scramble: "EKCWR", solution: "WRECK", difficulty: "Hard", isUnsolvable: false },
{ itemId: 200, scramble: "TUHYO", solution: "YOUTH", difficulty: "Hard", isUnsolvable: false },
{ itemId: 201, scramble: "UOTEB", solution: "EBOUT", difficulty: "Hard", isUnsolvable: true },
{ itemId: 202, scramble: "IBDCA", solution: "ACBID", difficulty: "Hard", isUnsolvable: true },
{ itemId: 203, scramble: "ITRMD", solution: "RDMIT", difficulty: "Hard", isUnsolvable: true },
{ itemId: 204, scramble: "PFDAO", solution: "ADOPF", difficulty: "Hard", isUnsolvable: true },
{ itemId: 205, scramble: "TRZFA", solution: "AFTZR", difficulty: "Hard", isUnsolvable: true },
{ itemId: 206, scramble: "IHVAL", solution: "ALIVH", difficulty: "Hard", isUnsolvable: true },
{ itemId: 207, scramble: "GEUIR", solution: "IRGUE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 208, scramble: "NOBCF", solution: "BFCON", difficulty: "Hard", isUnsolvable: true },
{ itemId: 209, scramble: "LWOES", solution: "SELOW", difficulty: "Hard", isUnsolvable: true },
{ itemId: 210, scramble: "KNLRA", solution: "RLANK", difficulty: "Hard", isUnsolvable: true },
{ itemId: 211, scramble: "ANIUR", solution: "URAIN", difficulty: "Hard", isUnsolvable: true },
{ itemId: 212, scramble: "KOESR", solution: "SROKE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 213, scramble: "AEPRH", solution: "RHEAP", difficulty: "Hard", isUnsolvable: true },
{ itemId: 214, scramble: "EFRIH", solution: "RHIEF", difficulty: "Hard", isUnsolvable: true },
{ itemId: 215, scramble: "CNPDA", solution: "DANCP", difficulty: "Hard", isUnsolvable: true },
{ itemId: 216, scramble: "GTFDR", solution: "DRGFT", difficulty: "Hard", isUnsolvable: true },
{ itemId: 217, scramble: "YWUDM", solution: "DUMWY", difficulty: "Hard", isUnsolvable: true },
{ itemId: 218, scramble: "OYNBA", solution: "ABONY", difficulty: "Hard", isUnsolvable: true },
{ itemId: 219, scramble: "OYAJN", solution: "ANJOY", difficulty: "Hard", isUnsolvable: true },
{ itemId: 220, scramble: "BSXEI", solution: "EXISB", difficulty: "Hard", isUnsolvable: true },
{ itemId: 221, scramble: "RAITX", solution: "IXTRA", difficulty: "Hard", isUnsolvable: true },
{ itemId: 222, scramble: "LEUIF", solution: "FIELU", difficulty: "Hard", isUnsolvable: true },
{ itemId: 223, scramble: "SRTIL", solution: "LIRST", difficulty: "Hard", isUnsolvable: true },
{ itemId: 224, scramble: "RODJS", solution: "SJORD", difficulty: "Hard", isUnsolvable: true },
{ itemId: 225, scramble: "UDPFL", solution: "FLUPD", difficulty: "Hard", isUnsolvable: true },
{ itemId: 226, scramble: "SUODC", solution: "DOCUS", difficulty: "Hard", isUnsolvable: true },
{ itemId: 227, scramble: "YDFUO", solution: "FOUYD", difficulty: "Hard", isUnsolvable: true },
{ itemId: 228, scramble: "OTGCE", solution: "GECTO", difficulty: "Hard", isUnsolvable: true },
{ itemId: 229, scramble: "NQTGI", solution: "GIQNT", difficulty: "Hard", isUnsolvable: true },
{ itemId: 230, scramble: "ACTGR", solution: "GRCAT", difficulty: "Hard", isUnsolvable: true },
{ itemId: 231, scramble: "RNOHP", solution: "HPRON", difficulty: "Hard", isUnsolvable: true },
{ itemId: 232, scramble: "GREOH", solution: "HORGE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 233, scramble: "AELDO", solution: "ODEAL", difficulty: "Hard", isUnsolvable: true },
{ itemId: 234, scramble: "UGMIA", solution: "IMAGU", difficulty: "Hard", isUnsolvable: true },
{ itemId: 235, scramble: "YLEPM", solution: "EMPLY", difficulty: "Hard", isUnsolvable: true },
{ itemId: 236, scramble: "BMOUR", solution: "RUMBO", difficulty: "Hard", isUnsolvable: true },
{ itemId: 237, scramble: "EUALR", solution: "LARUE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 238, scramble: "UHGRA", solution: "RAUGH", difficulty: "Hard", isUnsolvable: true },
{ itemId: 239, scramble: "RUNEL", solution: "LEURN", difficulty: "Hard", isUnsolvable: true },
{ itemId: 240, scramble: "GCILA", solution: "LAGIC", difficulty: "Hard", isUnsolvable: true },
{ itemId: 241, scramble: "OJMCI", solution: "MICJO", difficulty: "Hard", isUnsolvable: true },
{ itemId: 242, scramble: "EYRNO", solution: "RONEY", difficulty: "Hard", isUnsolvable: true },
{ itemId: 243, scramble: "SIERO", solution: "ROISE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 244, scramble: "SREUT", solution: "TURSE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 245, scramble: "HREJT", solution: "JTHER", difficulty: "Hard", isUnsolvable: true },
{ itemId: 246, scramble: "RYTPB", solution: "PBRTY", difficulty: "Hard", isUnsolvable: true },
{ itemId: 247, scramble: "OLXHR", solution: "RHLOX", difficulty: "Hard", isUnsolvable: true },
{ itemId: 248, scramble: "AEXLP", solution: "PLAXE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 249, scramble: "NTPIY", solution: "PYINT", difficulty: "Hard", isUnsolvable: true },
{ itemId: 250, scramble: "IJMRP", solution: "PRIMJ", difficulty: "Hard", isUnsolvable: true },
{ itemId: 251, scramble: "KAEUR", solution: "RUAKE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 252, scramble: "KCRIU", solution: "RUICK", difficulty: "Hard", isUnsolvable: true },
{ itemId: 253, scramble: "IJRDA", solution: "RADIJ", difficulty: "Hard", isUnsolvable: true },
{ itemId: 254, scramble: "YDSAE", solution: "SEADY", difficulty: "Hard", isUnsolvable: true },
{ itemId: 255, scramble: "IONHS", solution: "SHINO", difficulty: "Hard", isUnsolvable: true },
{ itemId: 256, scramble: "HGTDI", solution: "DIGHT", difficulty: "Hard", isUnsolvable: true },
{ itemId: 257, scramble: "AYLSO", solution: "SOYAL", difficulty: "Hard", isUnsolvable: true },
{ itemId: 258, scramble: "VYOAE", solution: "EAVOY", difficulty: "Hard", isUnsolvable: true },
{ itemId: 259, scramble: "LJCSA", solution: "SCALJ", difficulty: "Hard", isUnsolvable: true },
{ itemId: 260, scramble: "KCROH", solution: "RHOCK", difficulty: "Hard", isUnsolvable: true },
{ itemId: 261, scramble: "NUDSG", solution: "SGUND", difficulty: "Hard", isUnsolvable: true },
{ itemId: 262, scramble: "TUHOL", solution: "LOUTH", difficulty: "Hard", isUnsolvable: true },
{ itemId: 263, scramble: "WCSAP", solution: "SPACW", difficulty: "Hard", isUnsolvable: true },
{ itemId: 264, scramble: "AEKPR", solution: "RPEAK", difficulty: "Hard", isUnsolvable: true },
{ itemId: 265, scramble: "ILTPR", solution: "RPLIT", difficulty: "Hard", isUnsolvable: true },
{ itemId: 266, scramble: "GKTSA", solution: "STAGK", difficulty: "Hard", isUnsolvable: true },
{ itemId: 267, scramble: "OKCTR", solution: "RTOCK", difficulty: "Hard", isUnsolvable: true },
{ itemId: 268, scramble: "UYDTR", solution: "RTUDY", difficulty: "Hard", isUnsolvable: true },
{ itemId: 269, scramble: "RATGU", solution: "TUGAR", difficulty: "Hard", isUnsolvable: true },
{ itemId: 270, scramble: "JLATB", solution: "TABLJ", difficulty: "Hard", isUnsolvable: true },
{ itemId: 271, scramble: "NHKRA", solution: "RHANK", difficulty: "Hard", isUnsolvable: true },
{ itemId: 272, scramble: "EQIHT", solution: "THEIQ", difficulty: "Hard", isUnsolvable: true },
{ itemId: 273, scramble: "IHKRN", solution: "RHINK", difficulty: "Hard", isUnsolvable: true },
{ itemId: 274, scramble: "NETYH", solution: "THYNE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 275, scramble: "UHCRO", solution: "ROUCH", difficulty: "Hard", isUnsolvable: true },
{ itemId: 276, scramble: "AKCQT", solution: "TQACK", difficulty: "Hard", isUnsolvable: true },
{ itemId: 277, scramble: "IECWR", solution: "RWICE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 278, scramble: "OXABN", solution: "ANBOX", difficulty: "Hard", isUnsolvable: true },
{ itemId: 279, scramble: "EJRNU", solution: "UNJER", difficulty: "Hard", isUnsolvable: true },
{ itemId: 280, scramble: "BDARU", solution: "URBAD", difficulty: "Hard", isUnsolvable: true },
{ itemId: 281, scramble: "EORDI", solution: "RIDEO", difficulty: "Hard", isUnsolvable: true },
{ itemId: 282, scramble: "ATLSV", solution: "VSTAL", difficulty: "Hard", isUnsolvable: true },
{ itemId: 283, scramble: "TEWNA", solution: "WANTE", difficulty: "Hard", isUnsolvable: true },
{ itemId: 284, scramble: "ERZTA", solution: "ZATER", difficulty: "Hard", isUnsolvable: true },
{ itemId: 285, scramble: "DLRUO", solution: "ROULD", difficulty: "Hard", isUnsolvable: true },
{ itemId: 286, scramble: "IKTRW", solution: "WRITK", difficulty: "Hard", isUnsolvable: true },
{ itemId: 287, scramble: "EMRLY", solution: "RYLEM", difficulty: "Hard", isUnsolvable: true },
{ itemId: 288, scramble: "HSAYC", solution: "YACHS", difficulty: "Hard", isUnsolvable: true },
{ itemId: 289, scramble: "GNRUO", solution: "ROUNG", difficulty: "Hard", isUnsolvable: true },
{ itemId: 290, scramble: "EARZE", solution: "ZEERA", difficulty: "Hard", isUnsolvable: true },
  ],
};

// 3) Condition from URL and ITEMS array
const urlParams = new URLSearchParams(window.location.search);
const condition = urlParams.get("cond") || "Easy";

// Fisher–Yates shuffle (returns a new array)
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createRandomizedSet() {
  let baseList;

  if (condition === "Hard") {
    const all = STIMULI["Hard"] || [];
    const solvable = all.filter(stim => !stim.isUnsolvable);
    const unsolvable = all.filter(stim => stim.isUnsolvable);

    const totalTarget = HARD_SET_SIZE;
    const targetUnsolvable = Math.round(
      totalTarget * HARD_UNSOLVABLE_PROPORTION
    );
    const targetSolvable = totalTarget - targetUnsolvable;

    const chosenSolvable = shuffleArray(solvable).slice(
      0,
      Math.min(targetSolvable, solvable.length)
    );
    const chosenUnsolvable = shuffleArray(unsolvable).slice(
      0,
      Math.min(targetUnsolvable, unsolvable.length)
    );

    baseList = shuffleArray(chosenSolvable.concat(chosenUnsolvable));
  } else {
    const pool = STIMULI[condition] || STIMULI["Easy"];
    baseList = shuffleArray(pool);
  }

  return baseList.map((stim, idx) => ({
    trialIndex: idx + 1,
    condition: condition,
    ...stim,
  }));
}

let ITEMS = createRandomizedSet();

// 4) Global state
let trials = [];
let currentItemIndex = 0;
let presentationIndex = 1;
let cycleIndex = 1;

let attempts = 0;
let trialStartMs = Date.now();
let firstAttemptMs = null;
let finishedCurrentItem = false;
let skipTimerId = null;

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
const keyboardDiv = document.getElementById("keyboard");

// 6) Helper to get current item
function getCurrentItem() {
  return ITEMS[currentItemIndex];
}

// 7) Helper to send data to Qualtrics
function sendTaskDataToParent(reason) {
  const payload = {
    type: "ScrambleTaskComplete",
    reason, // "time_limit"
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
      input.setAttribute("enterkeyhint", "done");

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
    cycleIndex += 1;
    ITEMS = createRandomizedSet();
    currentItemIndex = 0;
  }

  startCurrentItem();
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
  presentationIndex: presentationIndex,
  cycleIndex: cycleIndex,
  trialIndex: item.trialIndex,
  itemId: item.itemId,
  scramble: item.scramble,
  solution: item.solution,
  difficulty: item.difficulty,
  condition: item.condition,
  isUnsolvable: item.isUnsolvable,
  response: response,
  partialResponse: "",
  partialResponseLength: 0,
  correct: correct,
  skipped: skipped,
  completed: true,
  endReason: correct ? "correct" : "skipped",
  rtMs: rtMs,
  attempts: attempts,
  timestampStart: new Date(trialStartMs).toISOString(),
  timestampEnd: new Date(endMs).toISOString(),
};

trials.push(trialRecord);
presentationIndex += 1;

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
      "Try again or use the 'Skip' button if you think that you cannot solve this one.";
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
  const item = getCurrentItem();
  const endMs = Date.now();
  const rtMs = endMs - trialStartMs;
  const partialResponse = (currentRowInputs || [])
    .map(inp => (inp.value || "").trim().toUpperCase())
    .join("");
  const partialResponseLength = partialResponse.length;

  if (item && !finishedCurrentItem) {
    const incompleteTrialRecord = {
      presentationIndex: presentationIndex,
      cycleIndex: cycleIndex,
      trialIndex: item.trialIndex,
      itemId: item.itemId,
      scramble: item.scramble,
      solution: item.solution,
      difficulty: item.difficulty,
      condition: item.condition,
      isUnsolvable: item.isUnsolvable,
      response: "",
      partialResponse: partialResponse,
      partialResponseLength: partialResponseLength,
      correct: false,
      skipped: false,
      completed: false,
      endReason: "time_limit_incomplete",
      rtMs: rtMs,
      attempts: attempts,
      timestampStart: new Date(trialStartMs).toISOString(),
      timestampEnd: new Date(endMs).toISOString(),
    };

    trials.push(incompleteTrialRecord);
  }

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


// 18) On-screen keyboard handler
if (keyboardDiv) {
  keyboardDiv.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-key]");
    if (!btn || finishedCurrentItem || taskEndedByTime) return;

    const key = btn.getAttribute("data-key");

    if (key === "ENTER") {
      handleSubmitAttempt();
    } else if (key === "BACKSPACE") {
      if (!currentRowInputs || currentRowInputs.length === 0) return;
      let idx = currentRowInputs.findIndex(inp => document.activeElement === inp);
      if (idx === -1) idx = currentRowInputs.length - 1;

      if (idx >= 0) {
        if (currentRowInputs[idx].value) {
          currentRowInputs[idx].value = "";
        } else if (idx > 0) {
          currentRowInputs[idx - 1].value = "";
          currentRowInputs[idx - 1].focus();
        }
      }
    } else {
      // letter key
      const letter = key.toUpperCase();
      if (!currentRowInputs || currentRowInputs.length === 0) return;

      let idx = currentRowInputs.findIndex(inp => document.activeElement === inp);
      if (idx === -1) {
        // focus first empty box, or 0 if all filled
        idx = currentRowInputs.findIndex(inp => !inp.value);
        if (idx === -1) idx = 0;
      }

      if (idx >= 0 && idx < currentRowInputs.length) {
        currentRowInputs[idx].value = letter;
        if (idx < currentRowInputs.length - 1) {
          currentRowInputs[idx + 1].focus();
        }
      }
    }
  });
}

// 19) Start the first item and the global task timer
startCurrentItem();
startGlobalTaskTimer();

