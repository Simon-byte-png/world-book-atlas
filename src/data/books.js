// 世界好书书单。
// country 与 world-atlas topojson 的 properties.name 完全一致，保证地图匹配。
// en / enAuthor : 英文书名与罗马化作者，用于从 Open Library 匹配真实封面
// score  : 综合评分（0-100）  douban : 豆瓣评分快照  nobel : 作者获诺奖年份|null
const raw = [
  // ————— 法国 France —————
  { title: '追忆似水年华', original: 'À la recherche du temps perdu', en: 'In Search of Lost Time', enAuthor: 'Marcel Proust', author: '马塞尔·普鲁斯特', country: 'France', year: 1913, genre: '小说', score: 96, douban: 9.2, nobel: null, blurb: '意识流巅峰，对时间与记忆的浩瀚追寻。' },
  { title: '悲惨世界', original: 'Les Misérables', en: 'Les Miserables', enAuthor: 'Victor Hugo', author: '维克多·雨果', country: 'France', year: 1862, genre: '小说', score: 95, douban: 9.4, nobel: null, blurb: '苦难与救赎交织的人道主义史诗。' },
  { title: '局外人', original: "L'Étranger", en: 'The Stranger', enAuthor: 'Albert Camus', author: '阿尔贝·加缪', country: 'France', year: 1942, genre: '小说', score: 92, douban: 9.0, nobel: 1957, blurb: '荒诞哲学的冷峻寓言。' },
  { title: '红与黑', original: 'Le Rouge et le Noir', en: 'The Red and the Black', enAuthor: 'Stendhal', author: '司汤达', country: 'France', year: 1830, genre: '小说', score: 90, douban: 8.6, nobel: null, blurb: '野心青年在复辟时代的攀爬与幻灭。' },
  { title: '包法利夫人', original: 'Madame Bovary', en: 'Madame Bovary', enAuthor: 'Gustave Flaubert', author: '古斯塔夫·福楼拜', country: 'France', year: 1857, genre: '小说', score: 90, douban: 8.5, nobel: null, blurb: '现实主义的精雕细刻之作。' },
  { title: '高老头', original: 'Le Père Goriot', en: 'Father Goriot', enAuthor: 'Honore de Balzac', author: '巴尔扎克', country: 'France', year: 1835, genre: '小说', score: 88, douban: 8.6, nobel: null, blurb: '《人间喜剧》中父爱与金钱的悲剧。' },
  { title: '基督山伯爵', original: 'Le Comte de Monte-Cristo', en: 'The Count of Monte Cristo', enAuthor: 'Alexandre Dumas', author: '大仲马', country: 'France', year: 1844, genre: '小说', score: 89, douban: 9.1, nobel: null, blurb: '越狱、复仇与命运的通俗史诗。' },
  { title: '三个火枪手', original: 'Les Trois Mousquetaires', en: 'The Three Musketeers', enAuthor: 'Alexandre Dumas', author: '大仲马', country: 'France', year: 1844, genre: '小说', score: 84, douban: 8.7, nobel: null, blurb: '为了荣誉与友谊的冒险传奇。' },
  { title: '情人', original: "L'Amant", en: 'The Lover', enAuthor: 'Marguerite Duras', author: '玛格丽特·杜拉斯', country: 'France', year: 1984, genre: '小说', score: 84, douban: 8.5, nobel: null, blurb: '殖民地少女的欲望与苍凉回望。' },
  { title: '小王子', original: 'Le Petit Prince', en: 'The Little Prince', enAuthor: 'Antoine de Saint-Exupery', author: '圣埃克苏佩里', country: 'France', year: 1943, genre: '儿童', score: 93, douban: 9.0, nobel: null, blurb: '写给大人的童话，纯真、爱与孤独。' },
  { title: '恶之花', original: 'Les Fleurs du mal', en: 'The Flowers of Evil', enAuthor: 'Charles Baudelaire', author: '波德莱尔', country: 'France', year: 1857, genre: '诗歌', score: 87, douban: 8.9, nobel: null, blurb: '现代诗的开端，颓废中的美。' },
  { title: '约翰·克利斯朵夫', original: 'Jean-Christophe', en: 'Jean-Christophe', enAuthor: 'Romain Rolland', author: '罗曼·罗兰', country: 'France', year: 1912, genre: '小说', score: 85, douban: 9.0, nobel: 1915, blurb: '一位音乐家与时代搏斗的成长史诗。' },
  { title: '悠悠岁月', original: 'Les Années', en: 'The Years', enAuthor: 'Annie Ernaux', author: '安妮·埃尔诺', country: 'France', year: 2008, genre: '散文', score: 83, douban: 8.5, nobel: 2022, blurb: '以集体记忆写就的"无人称自传"。' },

  // ————— 英国 United Kingdom —————
  { title: '哈姆雷特', original: 'Hamlet', en: 'Hamlet', enAuthor: 'William Shakespeare', author: '威廉·莎士比亚', country: 'United Kingdom', year: 1601, genre: '戏剧', score: 97, douban: 9.0, nobel: null, blurb: '复仇与犹疑，对生死的永恒诘问。' },
  { title: '一九八四', original: 'Nineteen Eighty-Four', en: '1984', enAuthor: 'George Orwell', author: '乔治·奥威尔', country: 'United Kingdom', year: 1949, genre: '科幻', score: 95, douban: 9.4, nobel: null, blurb: '极权与自由的反乌托邦警世寓言。' },
  { title: '傲慢与偏见', original: 'Pride and Prejudice', en: 'Pride and Prejudice', enAuthor: 'Jane Austen', author: '简·奥斯汀', country: 'United Kingdom', year: 1813, genre: '小说', score: 91, douban: 8.9, nobel: null, blurb: '机智优雅的爱情与世情喜剧。' },
  { title: '简·爱', original: 'Jane Eyre', en: 'Jane Eyre', enAuthor: 'Charlotte Bronte', author: '夏洛蒂·勃朗特', country: 'United Kingdom', year: 1847, genre: '小说', score: 89, douban: 8.6, nobel: null, blurb: '独立女性的尊严与爱情。' },
  { title: '呼啸山庄', original: 'Wuthering Heights', en: 'Wuthering Heights', enAuthor: 'Emily Bronte', author: '艾米莉·勃朗特', country: 'United Kingdom', year: 1847, genre: '小说', score: 88, douban: 8.6, nobel: null, blurb: '荒原上炽烈而毁灭的爱。' },
  { title: '双城记', original: 'A Tale of Two Cities', en: 'A Tale of Two Cities', enAuthor: 'Charles Dickens', author: '查尔斯·狄更斯', country: 'United Kingdom', year: 1859, genre: '小说', score: 89, douban: 9.0, nobel: null, blurb: '大革命洪流中的牺牲与重生。' },
  { title: '蝇王', original: 'Lord of the Flies', en: 'Lord of the Flies', enAuthor: 'William Golding', author: '威廉·戈尔丁', country: 'United Kingdom', year: 1954, genre: '小说', score: 86, douban: 8.7, nobel: 1983, blurb: '荒岛上孩子们退回野蛮的寓言。' },
  { title: '指环王', original: 'The Lord of the Rings', en: 'The Lord of the Rings', enAuthor: 'J.R.R. Tolkien', author: 'J.R.R.托尔金', country: 'United Kingdom', year: 1954, genre: '科幻', score: 90, douban: 9.2, nobel: null, blurb: '中土世界的奇幻史诗典范。' },
  { title: '达洛维夫人', original: 'Mrs Dalloway', en: 'Mrs Dalloway', enAuthor: 'Virginia Woolf', author: '弗吉尼亚·伍尔夫', country: 'United Kingdom', year: 1925, genre: '小说', score: 86, douban: 8.4, nobel: null, blurb: '一日之内的意识流与生命回响。' },
  { title: '弗兰肯斯坦', original: 'Frankenstein', en: 'Frankenstein', enAuthor: 'Mary Shelley', author: '玛丽·雪莱', country: 'United Kingdom', year: 1818, genre: '科幻', score: 85, douban: 8.2, nobel: null, blurb: '科幻小说的鼻祖，造物与责任。' },
  { title: '鲁滨逊漂流记', original: 'Robinson Crusoe', en: 'Robinson Crusoe', enAuthor: 'Daniel Defoe', author: '丹尼尔·笛福', country: 'United Kingdom', year: 1719, genre: '小说', score: 84, douban: 8.1, nobel: null, blurb: '孤岛求生的近代小说先声。' },
  { title: '哈利·波特与魔法石', original: "Harry Potter and the Philosopher's Stone", en: "Harry Potter and the Sorcerer's Stone", enAuthor: 'J.K. Rowling', author: 'J.K.罗琳', country: 'United Kingdom', year: 1997, genre: '儿童', score: 87, douban: 9.1, nobel: null, blurb: '魔法世界的成长与勇气。' },
  { title: '长日将尽', original: 'The Remains of the Day', en: 'The Remains of the Day', enAuthor: 'Kazuo Ishiguro', author: '石黑一雄', country: 'United Kingdom', year: 1989, genre: '小说', score: 86, douban: 9.0, nobel: 2017, blurb: '一位管家克制一生的追忆与遗憾。' },

  // ————— 爱尔兰 Ireland —————
  { title: '尤利西斯', original: 'Ulysses', en: 'Ulysses', enAuthor: 'James Joyce', author: '詹姆斯·乔伊斯', country: 'Ireland', year: 1922, genre: '小说', score: 94, douban: 8.6, nobel: null, blurb: '现代主义的语言迷宫，一日即永恒。' },
  { title: '等待戈多', original: 'Waiting for Godot', en: 'Waiting for Godot', enAuthor: 'Samuel Beckett', author: '塞缪尔·贝克特', country: 'Ireland', year: 1953, genre: '戏剧', score: 89, douban: 8.8, nobel: 1969, blurb: '荒诞派戏剧的里程碑。' },
  { title: '道林·格雷的画像', original: 'The Picture of Dorian Gray', en: 'The Picture of Dorian Gray', enAuthor: 'Oscar Wilde', author: '奥斯卡·王尔德', country: 'Ireland', year: 1890, genre: '小说', score: 86, douban: 8.7, nobel: null, blurb: '唯美与堕落的浮士德式寓言。' },
  { title: '格列佛游记', original: "Gulliver's Travels", en: "Gulliver's Travels", enAuthor: 'Jonathan Swift', author: '乔纳森·斯威夫特', country: 'Ireland', year: 1726, genre: '小说', score: 84, douban: 8.2, nobel: null, blurb: '奇境旅行下的辛辣讽刺。' },

  // ————— 俄罗斯 Russia —————
  { title: '战争与和平', original: 'Война и мир', en: 'War and Peace', enAuthor: 'Leo Tolstoy', author: '列夫·托尔斯泰', country: 'Russia', year: 1869, genre: '小说', score: 96, douban: 9.3, nobel: null, blurb: '战争年代的民族与人性全景。' },
  { title: '罪与罚', original: 'Преступление и наказание', en: 'Crime and Punishment', enAuthor: 'Fyodor Dostoevsky', author: '陀思妥耶夫斯基', country: 'Russia', year: 1866, genre: '小说', score: 95, douban: 9.2, nobel: null, blurb: '灵魂在罪愆中的震颤与救赎。' },
  { title: '卡拉马佐夫兄弟', original: 'Братья Карамазовы', en: 'The Brothers Karamazov', enAuthor: 'Fyodor Dostoevsky', author: '陀思妥耶夫斯基', country: 'Russia', year: 1880, genre: '小说', score: 94, douban: 9.5, nobel: null, blurb: '信仰、自由与弑父的终极追问。' },
  { title: '安娜·卡列尼娜', original: 'Анна Каренина', en: 'Anna Karenina', enAuthor: 'Leo Tolstoy', author: '列夫·托尔斯泰', country: 'Russia', year: 1877, genre: '小说', score: 93, douban: 9.2, nobel: null, blurb: '爱欲与道德的动人悲剧。' },
  { title: '叶甫盖尼·奥涅金', original: 'Евгений Онегин', en: 'Eugene Onegin', enAuthor: 'Alexander Pushkin', author: '普希金', country: 'Russia', year: 1833, genre: '诗歌', score: 88, douban: 8.9, nobel: null, blurb: '俄语诗体小说的巅峰。' },
  { title: '死魂灵', original: 'Мёртвые души', en: 'Dead Souls', enAuthor: 'Nikolai Gogol', author: '果戈里', country: 'Russia', year: 1842, genre: '小说', score: 86, douban: 8.5, nobel: null, blurb: '收购死农奴的荒诞讽刺。' },
  { title: '大师与玛格丽特', original: 'Мастер и Маргарита', en: 'The Master and Margarita', enAuthor: 'Mikhail Bulgakov', author: '布尔加科夫', country: 'Russia', year: 1967, genre: '小说', score: 90, douban: 9.2, nobel: null, blurb: '魔鬼造访莫斯科的讽刺奇想。' },
  { title: '日瓦戈医生', original: 'Доктор Живаго', en: 'Doctor Zhivago', enAuthor: 'Boris Pasternak', author: '帕斯捷尔纳克', country: 'Russia', year: 1957, genre: '小说', score: 87, douban: 8.6, nobel: 1958, blurb: '大时代裂变中的爱情与命运。' },
  { title: '静静的顿河', original: 'Тихий Дон', en: 'And Quiet Flows the Don', enAuthor: 'Mikhail Sholokhov', author: '肖洛霍夫', country: 'Russia', year: 1940, genre: '小说', score: 86, douban: 9.0, nobel: 1965, blurb: '哥萨克在革命与战争中的命运长卷。' },
  { title: '古拉格群岛', original: 'Архипелаг ГУЛАГ', en: 'The Gulag Archipelago', enAuthor: 'Aleksandr Solzhenitsyn', author: '索尔仁尼琴', country: 'Russia', year: 1973, genre: '纪实', score: 85, douban: 9.4, nobel: 1970, blurb: '劳改营体制的良心见证。' },
  { title: '樱桃园', original: 'Вишнёвый сад', en: 'The Cherry Orchard', enAuthor: 'Anton Chekhov', author: '契诃夫', country: 'Russia', year: 1904, genre: '戏剧', score: 85, douban: 8.9, nobel: null, blurb: '旧俄庄园在变革中的挽歌。' },

  // ————— 德国 Germany —————
  { title: '浮士德', original: 'Faust', en: 'Faust', enAuthor: 'Johann Wolfgang von Goethe', author: '歌德', country: 'Germany', year: 1808, genre: '戏剧', score: 93, douban: 8.8, nobel: null, blurb: '求知者与魔鬼的灵魂契约。' },
  { title: '少年维特的烦恼', original: 'Die Leiden des jungen Werthers', en: 'The Sorrows of Young Werther', enAuthor: 'Johann Wolfgang von Goethe', author: '歌德', country: 'Germany', year: 1774, genre: '小说', score: 85, douban: 8.1, nobel: null, blurb: '狂飙年代的炽情与忧郁。' },
  { title: '魔山', original: 'Der Zauberberg', en: 'The Magic Mountain', enAuthor: 'Thomas Mann', author: '托马斯·曼', country: 'Germany', year: 1924, genre: '小说', score: 89, douban: 8.9, nobel: 1929, blurb: '疗养院中的时间与思想辩证。' },
  { title: '铁皮鼓', original: 'Die Blechtrommel', en: 'The Tin Drum', enAuthor: 'Gunter Grass', author: '君特·格拉斯', country: 'Germany', year: 1959, genre: '小说', score: 88, douban: 8.6, nobel: 1999, blurb: '拒绝长大的荒诞历史寓言。' },
  { title: '西线无战事', original: 'Im Westen nichts Neues', en: 'All Quiet on the Western Front', enAuthor: 'Erich Maria Remarque', author: '雷马克', country: 'Germany', year: 1929, genre: '小说', score: 88, douban: 9.2, nobel: null, blurb: '一战士兵眼中战争的荒芜。' },
  { title: '香水', original: 'Das Parfum', en: 'Perfume', enAuthor: 'Patrick Suskind', author: '帕特里克·聚斯金德', country: 'Germany', year: 1985, genre: '小说', score: 85, douban: 8.5, nobel: null, blurb: '追逐极致气味的天才与恶魔。' },

  // ————— 瑞士 Switzerland —————
  { title: '悉达多', original: 'Siddhartha', en: 'Siddhartha', enAuthor: 'Hermann Hesse', author: '赫尔曼·黑塞', country: 'Switzerland', year: 1922, genre: '小说', score: 88, douban: 8.9, nobel: 1946, blurb: '一个人求道与自我圆满的东方寓言。' },
  { title: '海蒂', original: 'Heidi', en: 'Heidi', enAuthor: 'Johanna Spyri', author: '约翰娜·斯比丽', country: 'Switzerland', year: 1881, genre: '儿童', score: 78, douban: 8.6, nobel: null, blurb: '阿尔卑斯山上的纯真女孩。' },

  // ————— 奥地利 Austria —————
  { title: '一个陌生女人的来信', original: 'Brief einer Unbekannten', en: 'Letter from an Unknown Woman', enAuthor: 'Stefan Zweig', author: '斯特凡·茨威格', country: 'Austria', year: 1922, genre: '小说', score: 86, douban: 8.9, nobel: null, blurb: '一封信里燃尽一生的暗恋。' },
  { title: '没有个性的人', original: 'Der Mann ohne Eigenschaften', en: 'The Man Without Qualities', enAuthor: 'Robert Musil', author: '罗伯特·穆齐尔', country: 'Austria', year: 1930, genre: '小说', score: 85, douban: 8.9, nobel: null, blurb: '帝国末世的思想全景。' },

  // ————— 捷克 Czechia —————
  { title: '变形记', original: 'Die Verwandlung', en: 'The Metamorphosis', enAuthor: 'Franz Kafka', author: '弗兰茨·卡夫卡', country: 'Czechia', year: 1915, genre: '小说', score: 92, douban: 8.8, nobel: null, blurb: '人变甲虫的现代寓言。' },
  { title: '审判', original: 'Der Process', en: 'The Trial', enAuthor: 'Franz Kafka', author: '弗兰茨·卡夫卡', country: 'Czechia', year: 1925, genre: '小说', score: 90, douban: 8.8, nobel: null, blurb: '无名罪责下的官僚噩梦。' },
  { title: '生命中不能承受之轻', original: 'Nesnesitelná lehkost bytí', en: 'The Unbearable Lightness of Being', enAuthor: 'Milan Kundera', author: '米兰·昆德拉', country: 'Czechia', year: 1984, genre: '小说', score: 89, douban: 8.5, nobel: null, blurb: '轻与重之间的爱与政治。' },
  { title: '好兵帅克', original: 'Osudy dobrého vojáka Švejka', en: 'The Good Soldier Svejk', enAuthor: 'Jaroslav Hasek', author: '雅罗斯拉夫·哈谢克', country: 'Czechia', year: 1923, genre: '小说', score: 83, douban: 8.7, nobel: null, blurb: '以憨傻消解战争的黑色幽默。' },

  // ————— 意大利 Italy —————
  { title: '神曲', original: 'La Divina Commedia', en: 'The Divine Comedy', enAuthor: 'Dante Alighieri', author: '但丁', country: 'Italy', year: 1320, genre: '诗歌', score: 96, douban: 8.9, nobel: null, blurb: '地狱、炼狱与天堂的灵魂之旅。' },
  { title: '十日谈', original: 'Decameron', en: 'The Decameron', enAuthor: 'Giovanni Boccaccio', author: '薄伽丘', country: 'Italy', year: 1353, genre: '小说', score: 85, douban: 8.3, nobel: null, blurb: '瘟疫下的百则人间故事。' },
  { title: '玫瑰的名字', original: 'Il nome della rosa', en: 'The Name of the Rose', enAuthor: 'Umberto Eco', author: '翁贝托·埃科', country: 'Italy', year: 1980, genre: '小说', score: 88, douban: 8.7, nobel: null, blurb: '中世纪修道院的符号谜案。' },
  { title: '看不见的城市', original: 'Le città invisibili', en: 'Invisible Cities', enAuthor: 'Italo Calvino', author: '伊塔洛·卡尔维诺', country: 'Italy', year: 1972, genre: '小说', score: 87, douban: 9.1, nobel: null, blurb: '马可·波罗讲述的五十五座幻城。' },
  { title: '豹', original: 'Il Gattopardo', en: 'The Leopard', enAuthor: 'Giuseppe Tomasi di Lampedusa', author: '兰佩杜萨', country: 'Italy', year: 1958, genre: '小说', score: 85, douban: 8.6, nobel: null, blurb: '旧贵族在统一浪潮中的黄昏。' },

  // ————— 西班牙 Spain —————
  { title: '堂吉诃德', original: 'Don Quijote', en: 'Don Quixote', enAuthor: 'Miguel de Cervantes', author: '塞万提斯', country: 'Spain', year: 1605, genre: '小说', score: 97, douban: 8.9, nobel: null, blurb: '骑士幻梦与现实的伟大对撞，现代小说的开山之作。' },
  { title: '风之影', original: 'La sombra del viento', en: 'The Shadow of the Wind', enAuthor: 'Carlos Ruiz Zafon', author: '卡洛斯·鲁伊斯·萨丰', country: 'Spain', year: 2001, genre: '小说', score: 84, douban: 8.7, nobel: null, blurb: '遗忘之书墓园里的悬疑与爱。' },

  // ————— 葡萄牙 Portugal —————
  { title: '失明症漫记', original: 'Ensaio sobre a cegueira', en: 'Blindness', enAuthor: 'Jose Saramago', author: '若泽·萨拉马戈', country: 'Portugal', year: 1995, genre: '小说', score: 88, douban: 8.7, nobel: 1998, blurb: '全城失明的人性试炼。' },
  { title: '惶然录', original: 'Livro do Desassossego', en: 'The Book of Disquiet', enAuthor: 'Fernando Pessoa', author: '费尔南多·佩索阿', country: 'Portugal', year: 1982, genre: '散文', score: 86, douban: 9.2, nobel: null, blurb: '不安之书，灵魂的碎片。' },

  // ————— 希腊 Greece —————
  { title: '奥德赛', original: 'Ὀδύσσεια', en: 'The Odyssey', enAuthor: 'Homer', author: '荷马', country: 'Greece', year: -800, genre: '诗歌', score: 95, douban: 8.9, nobel: null, blurb: '归乡漂泊的英雄史诗。' },
  { title: '伊利亚特', original: 'Ἰλιάς', en: 'The Iliad', enAuthor: 'Homer', author: '荷马', country: 'Greece', year: -800, genre: '诗歌', score: 94, douban: 8.8, nobel: null, blurb: '特洛伊战争的愤怒与荣耀。' },
  { title: '俄狄浦斯王', original: 'Οἰδίπους Τύραννος', en: 'Oedipus Rex', enAuthor: 'Sophocles', author: '索福克勒斯', country: 'Greece', year: -429, genre: '戏剧', score: 90, douban: 8.9, nobel: null, blurb: '命运不可逃的悲剧原型。' },
  { title: '伊索寓言', original: 'Αἰσώπου Μῦθοι', en: "Aesop's Fables", enAuthor: 'Aesop', author: '伊索', country: 'Greece', year: -560, genre: '儿童', score: 82, douban: 8.6, nobel: null, blurb: '流传两千年的动物智慧寓言。' },

  // ————— 荷兰 Netherlands —————
  { title: '安妮日记', original: 'Het Achterhuis', en: 'The Diary of a Young Girl', enAuthor: 'Anne Frank', author: '安妮·弗兰克', country: 'Netherlands', year: 1947, genre: '纪实', score: 90, douban: 9.0, nobel: null, blurb: '密室中的少女、恐惧与希望。' },

  // ————— 比利时 Belgium —————
  { title: '丁丁历险记', original: 'Les Aventures de Tintin', en: 'The Adventures of Tintin', enAuthor: 'Herge', author: '埃尔热', country: 'Belgium', year: 1929, genre: '儿童', score: 84, douban: 9.2, nobel: null, blurb: '小记者环游世界的漫画经典。' },

  // ————— 挪威 Norway —————
  { title: '玩偶之家', original: 'Et dukkehjem', en: "A Doll's House", enAuthor: 'Henrik Ibsen', author: '亨利克·易卜生', country: 'Norway', year: 1879, genre: '戏剧', score: 89, douban: 8.9, nobel: null, blurb: '娜拉出走，女性意识的觉醒。' },
  { title: '苏菲的世界', original: 'Sofies verden', en: "Sophie's World", enAuthor: 'Jostein Gaarder', author: '乔斯坦·贾德', country: 'Norway', year: 1991, genre: '小说', score: 85, douban: 8.7, nobel: null, blurb: '少女视角的西方哲学启蒙。' },
  { title: '晨与夜', original: 'Morgon og kveld', en: 'Morning and Evening', enAuthor: 'Jon Fosse', author: '约恩·福瑟', country: 'Norway', year: 2000, genre: '小说', score: 80, douban: 8.4, nobel: 2023, blurb: '生与死之间极简而澄澈的低语。' },

  // ————— 瑞典 Sweden —————
  { title: '长袜子皮皮', original: 'Pippi Långstrump', en: 'Pippi Longstocking', enAuthor: 'Astrid Lindgren', author: '阿斯特丽德·林格伦', country: 'Sweden', year: 1945, genre: '儿童', score: 83, douban: 9.0, nobel: null, blurb: '世界上最强壮的自由女孩。' },
  { title: '龙文身的女孩', original: 'Män som hatar kvinnor', en: 'The Girl with the Dragon Tattoo', enAuthor: 'Stieg Larsson', author: '斯蒂格·拉森', country: 'Sweden', year: 2005, genre: '小说', score: 82, douban: 8.5, nobel: null, blurb: '黑客女孩卷入的家族悬案。' },
  { title: '尼尔斯骑鹅旅行记', original: 'Nils Holgersson', en: "The Wonderful Adventures of Nils", enAuthor: 'Selma Lagerlof', author: '塞尔玛·拉格洛夫', country: 'Sweden', year: 1907, genre: '儿童', score: 82, douban: 8.5, nobel: 1909, blurb: '随雁群飞越瑞典的奇旅。' },

  // ————— 丹麦 Denmark —————
  { title: '安徒生童话', original: 'Eventyr', en: 'Fairy Tales', enAuthor: 'Hans Christian Andersen', author: '汉斯·克里斯蒂安·安徒生', country: 'Denmark', year: 1837, genre: '儿童', score: 90, douban: 9.1, nobel: null, blurb: '忧伤而美丽的世界童话。' },

  // ————— 芬兰 Finland —————
  { title: '卡勒瓦拉', original: 'Kalevala', en: 'The Kalevala', enAuthor: 'Elias Lonnrot', author: '埃利亚斯·伦罗特', country: 'Finland', year: 1835, genre: '诗歌', score: 80, douban: 8.4, nobel: null, blurb: '芬兰民族史诗。' },

  // ————— 冰岛 Iceland —————
  { title: '独立的人们', original: 'Sjálfstætt fólk', en: 'Independent People', enAuthor: 'Halldor Laxness', author: '哈尔多尔·拉克斯内斯', country: 'Iceland', year: 1934, genre: '小说', score: 81, douban: 8.6, nobel: 1955, blurb: '冰岛农人的倔强与尊严。' },

  // ————— 波兰 Poland —————
  { title: '你往何处去', original: 'Quo vadis', en: 'Quo Vadis', enAuthor: 'Henryk Sienkiewicz', author: '亨利克·显克维奇', country: 'Poland', year: 1896, genre: '小说', score: 84, douban: 8.6, nobel: 1905, blurb: '罗马暴政下的信仰与爱。' },
  { title: '太古和其他的时间', original: 'Prawiek i inne czasy', en: 'Primeval and Other Times', enAuthor: 'Olga Tokarczuk', author: '奥尔加·托卡尔丘克', country: 'Poland', year: 1996, genre: '小说', score: 84, douban: 8.8, nobel: 2018, blurb: '神话化的波兰村庄编年。' },
  { title: '辛波斯卡诗选', original: 'Wiersze', en: 'Poems New and Collected', enAuthor: 'Wislawa Szymborska', author: '维斯瓦娃·辛波斯卡', country: 'Poland', year: 1976, genre: '诗歌', score: 85, douban: 9.2, nobel: 1996, blurb: '举重若轻、洞见日常的诗。' },

  // ————— 匈牙利 Hungary —————
  { title: '无命运的人生', original: 'Sorstalanság', en: 'Fatelessness', enAuthor: 'Imre Kertesz', author: '凯尔泰斯·伊姆雷', country: 'Hungary', year: 1975, genre: '小说', score: 82, douban: 8.5, nobel: 2002, blurb: '少年的集中营记忆。' },

  // ————— 白俄罗斯 Belarus —————
  { title: '我是女兵，也是女人', original: 'У войны не женское лицо', en: "The Unwomanly Face of War", enAuthor: 'Svetlana Alexievich', author: '斯维特拉娜·阿列克谢耶维奇', country: 'Belarus', year: 1985, genre: '纪实', score: 84, douban: 9.3, nobel: 2015, blurb: '战争中女性的口述记忆。' },

  // ————— 哥伦比亚 Colombia —————
  { title: '百年孤独', original: 'Cien años de soledad', en: 'One Hundred Years of Solitude', enAuthor: 'Gabriel Garcia Marquez', author: '加西亚·马尔克斯', country: 'Colombia', year: 1967, genre: '小说', score: 96, douban: 9.3, nobel: 1982, blurb: '魔幻现实主义的家族史诗。' },
  { title: '霍乱时期的爱情', original: 'El amor en los tiempos del cólera', en: 'Love in the Time of Cholera', enAuthor: 'Gabriel Garcia Marquez', author: '加西亚·马尔克斯', country: 'Colombia', year: 1985, genre: '小说', score: 90, douban: 9.1, nobel: 1982, blurb: '跨越半个世纪的痴恋。' },

  // ————— 阿根廷 Argentina —————
  { title: '虚构集', original: 'Ficciones', en: 'Ficciones', enAuthor: 'Jorge Luis Borges', author: '博尔赫斯', country: 'Argentina', year: 1944, genre: '小说', score: 92, douban: 9.2, nobel: null, blurb: '迷宫、镜子与无限的智性短篇。' },
  { title: '跳房子', original: 'Rayuela', en: 'Hopscotch', enAuthor: 'Julio Cortazar', author: '胡里奥·科塔萨尔', country: 'Argentina', year: 1963, genre: '小说', score: 85, douban: 8.7, nobel: null, blurb: '可多重顺序阅读的实验小说。' },

  // ————— 智利 Chile —————
  { title: '二十首情诗和一支绝望的歌', original: 'Veinte poemas de amor', en: 'Twenty Love Poems and a Song of Despair', enAuthor: 'Pablo Neruda', author: '巴勃罗·聂鲁达', country: 'Chile', year: 1924, genre: '诗歌', score: 88, douban: 8.9, nobel: 1971, blurb: '情诗与大地之歌。' },
  { title: '2666', original: '2666', en: '2666', enAuthor: 'Roberto Bolano', author: '罗贝托·波拉尼奥', country: 'Chile', year: 2004, genre: '小说', score: 86, douban: 9.2, nobel: null, blurb: '以边境凶案串起的黑暗巨著。' },
  { title: '幽灵之家', original: 'La casa de los espíritus', en: 'The House of the Spirits', enAuthor: 'Isabel Allende', author: '伊莎贝尔·阿连德', country: 'Chile', year: 1982, genre: '小说', score: 84, douban: 8.7, nobel: null, blurb: '家族与政治的魔幻叙事。' },

  // ————— 秘鲁 Peru —————
  { title: '城市与狗', original: 'La ciudad y los perros', en: 'The Time of the Hero', enAuthor: 'Mario Vargas Llosa', author: '马里奥·巴尔加斯·略萨', country: 'Peru', year: 1963, genre: '小说', score: 84, douban: 8.6, nobel: 2010, blurb: '军校中的暴力与谎言。' },

  // ————— 危地马拉 Guatemala —————
  { title: '玉米人', original: 'Hombres de maíz', en: 'Men of Maize', enAuthor: 'Miguel Angel Asturias', author: '阿斯图里亚斯', country: 'Guatemala', year: 1949, genre: '小说', score: 80, douban: 8.2, nobel: 1967, blurb: '玛雅神话与现实交织的土地之歌。' },

  // ————— 巴西 Brazil —————
  { title: '布拉斯·库巴斯死后的回忆', original: 'Memórias Póstumas de Brás Cubas', en: 'The Posthumous Memoirs of Bras Cubas', enAuthor: 'Machado de Assis', author: '马查多·德·阿西斯', country: 'Brazil', year: 1881, genre: '小说', score: 85, douban: 8.6, nobel: null, blurb: '由亡者叙述的辛辣讽刺。' },
  { title: '牧羊少年奇幻之旅', original: 'O Alquimista', en: 'The Alchemist', enAuthor: 'Paulo Coelho', author: '保罗·柯艾略', country: 'Brazil', year: 1988, genre: '小说', score: 80, douban: 8.0, nobel: null, blurb: '追寻天命的寓言。' },

  // ————— 墨西哥 Mexico —————
  { title: '佩德罗·巴拉莫', original: 'Pedro Páramo', en: 'Pedro Paramo', enAuthor: 'Juan Rulfo', author: '胡安·鲁尔福', country: 'Mexico', year: 1955, genre: '小说', score: 88, douban: 8.8, nobel: null, blurb: '亡灵之镇的魔幻回响。' },

  // ————— 美国 United States of America —————
  { title: '白鲸', original: 'Moby-Dick', en: 'Moby Dick', enAuthor: 'Herman Melville', author: '赫尔曼·梅尔维尔', country: 'United States of America', year: 1851, genre: '小说', score: 93, douban: 8.4, nobel: null, blurb: '追逐白鲸的执念史诗。' },
  { title: '了不起的盖茨比', original: 'The Great Gatsby', en: 'The Great Gatsby', enAuthor: 'F. Scott Fitzgerald', author: '菲茨杰拉德', country: 'United States of America', year: 1925, genre: '小说', score: 92, douban: 8.4, nobel: null, blurb: '爵士时代幻灭的美国梦。' },
  { title: '喧哗与骚动', original: 'The Sound and the Fury', en: 'The Sound and the Fury', enAuthor: 'William Faulkner', author: '威廉·福克纳', country: 'United States of America', year: 1929, genre: '小说', score: 90, douban: 8.6, nobel: 1949, blurb: '南方家族的意识流挽歌。' },
  { title: '愤怒的葡萄', original: 'The Grapes of Wrath', en: 'The Grapes of Wrath', enAuthor: 'John Steinbeck', author: '约翰·斯坦贝克', country: 'United States of America', year: 1939, genre: '小说', score: 89, douban: 9.0, nobel: 1962, blurb: '大萧条中农民西迁的苦难。' },
  { title: '老人与海', original: 'The Old Man and the Sea', en: 'The Old Man and the Sea', enAuthor: 'Ernest Hemingway', author: '海明威', country: 'United States of America', year: 1952, genre: '小说', score: 89, douban: 8.6, nobel: 1954, blurb: '硬汉与命运的搏斗。' },
  { title: '杀死一只知更鸟', original: 'To Kill a Mockingbird', en: 'To Kill a Mockingbird', enAuthor: 'Harper Lee', author: '哈珀·李', country: 'United States of America', year: 1960, genre: '小说', score: 88, douban: 9.2, nobel: null, blurb: '南方小镇上的种族与良知。' },
  { title: '第二十二条军规', original: 'Catch-22', en: 'Catch-22', enAuthor: 'Joseph Heller', author: '约瑟夫·海勒', country: 'United States of America', year: 1961, genre: '小说', score: 86, douban: 8.5, nobel: null, blurb: '战争官僚的黑色幽默悖论。' },
  { title: '洛丽塔', original: 'Lolita', en: 'Lolita', enAuthor: 'Vladimir Nabokov', author: '纳博科夫', country: 'United States of America', year: 1955, genre: '小说', score: 88, douban: 8.1, nobel: null, blurb: '禁忌欲望与绝美文体的危险之书。' },
  { title: '麦田里的守望者', original: 'The Catcher in the Rye', en: 'The Catcher in the Rye', enAuthor: 'J.D. Salinger', author: 'J.D.塞林格', country: 'United States of America', year: 1951, genre: '小说', score: 88, douban: 8.1, nobel: null, blurb: '少年的愤怒与迷惘。' },
  { title: '飘', original: 'Gone with the Wind', en: 'Gone with the Wind', enAuthor: 'Margaret Mitchell', author: '玛格丽特·米切尔', country: 'United States of America', year: 1936, genre: '小说', score: 87, douban: 9.3, nobel: null, blurb: '南方庄园在内战中的兴衰与坚韧。' },
  { title: '宠儿', original: 'Beloved', en: 'Beloved', enAuthor: 'Toni Morrison', author: '托妮·莫里森', country: 'United States of America', year: 1987, genre: '小说', score: 86, douban: 8.4, nobel: 1993, blurb: '奴隶制创伤下的母爱与亡灵。' },
  { title: '瓦尔登湖', original: 'Walden', en: 'Walden', enAuthor: 'Henry David Thoreau', author: '亨利·戴维·梭罗', country: 'United States of America', year: 1854, genre: '散文', score: 87, douban: 8.3, nobel: null, blurb: '湖畔独居的简朴哲思。' },

  // ————— 加拿大 Canada —————
  { title: '使女的故事', original: "The Handmaid's Tale", en: "The Handmaid's Tale", enAuthor: 'Margaret Atwood', author: '玛格丽特·阿特伍德', country: 'Canada', year: 1985, genre: '科幻', score: 88, douban: 8.4, nobel: null, blurb: '神权极权下的女性寓言。' },
  { title: '少年Pi的奇幻漂流', original: 'Life of Pi', en: 'Life of Pi', enAuthor: 'Yann Martel', author: '扬·马特尔', country: 'Canada', year: 2001, genre: '小说', score: 85, douban: 9.1, nobel: null, blurb: '少年与孟加拉虎的海上漂流与信仰。' },
  { title: '逃离', original: 'Runaway', en: 'Runaway', enAuthor: 'Alice Munro', author: '爱丽丝·门罗', country: 'Canada', year: 2004, genre: '小说', score: 84, douban: 8.1, nobel: 2013, blurb: '短篇圣手笔下女性的出走与回望。' },
  { title: '绿山墙的安妮', original: 'Anne of Green Gables', en: 'Anne of Green Gables', enAuthor: 'Lucy Maud Montgomery', author: '露西·蒙哥马利', country: 'Canada', year: 1908, genre: '儿童', score: 82, douban: 8.9, nobel: null, blurb: '红发女孩的成长与想象力。' },

  // ————— 日本 Japan —————
  { title: '源氏物语', original: '源氏物語', en: 'The Tale of Genji', enAuthor: 'Murasaki Shikibu', author: '紫式部', country: 'Japan', year: 1008, genre: '小说', score: 92, douban: 8.3, nobel: null, blurb: '世界最早的长篇小说，平安朝的物哀。' },
  { title: '雪国', original: '雪国', en: 'Snow Country', enAuthor: 'Yasunari Kawabata', author: '川端康成', country: 'Japan', year: 1948, genre: '小说', score: 89, douban: 8.3, nobel: 1968, blurb: '徒劳之美的哀婉。' },
  { title: '罗生门', original: '羅生門', en: 'Rashomon', enAuthor: 'Ryunosuke Akutagawa', author: '芥川龙之介', country: 'Japan', year: 1915, genre: '小说', score: 87, douban: 8.9, nobel: null, blurb: '人性利己的锋利短篇。' },
  { title: '我是猫', original: '吾輩は猫である', en: 'I Am a Cat', enAuthor: 'Natsume Soseki', author: '夏目漱石', country: 'Japan', year: 1905, genre: '小说', score: 86, douban: 8.5, nobel: null, blurb: '以猫眼冷观明治世相的讽刺。' },
  { title: '人间失格', original: '人間失格', en: 'No Longer Human', enAuthor: 'Osamu Dazai', author: '太宰治', country: 'Japan', year: 1948, genre: '小说', score: 85, douban: 8.3, nobel: null, blurb: '边缘者自我放逐的告白。' },
  { title: '金阁寺', original: '金閣寺', en: 'The Temple of the Golden Pavilion', enAuthor: 'Yukio Mishima', author: '三岛由纪夫', country: 'Japan', year: 1956, genre: '小说', score: 87, douban: 8.5, nobel: null, blurb: '美的执念与毁灭。' },
  { title: '挪威的森林', original: 'ノルウェイの森', en: 'Norwegian Wood', enAuthor: 'Haruki Murakami', author: '村上春树', country: 'Japan', year: 1987, genre: '小说', score: 85, douban: 8.0, nobel: null, blurb: '青春、爱欲与丧失。' },

  // ————— 中国 China —————
  { title: '红楼梦', original: '红楼梦', en: 'Dream of the Red Chamber', enAuthor: 'Cao Xueqin', author: '曹雪芹', country: 'China', year: 1791, genre: '小说', score: 98, douban: 9.6, nobel: null, blurb: '大观园的兴衰与人情百态，古典小说之巅。' },
  { title: '三国演义', original: '三国演义', en: 'Romance of the Three Kingdoms', enAuthor: 'Luo Guanzhong', author: '罗贯中', country: 'China', year: 1522, genre: '小说', score: 92, douban: 9.3, nobel: null, blurb: '天下大势合久必分的英雄史诗。' },
  { title: '西游记', original: '西游记', en: 'Journey to the West', enAuthor: 'Wu Chengen', author: '吴承恩', country: 'China', year: 1592, genre: '小说', score: 91, douban: 8.9, nobel: null, blurb: '取经路上的神魔奇想。' },
  { title: '水浒传', original: '水浒传', en: 'Water Margin', enAuthor: 'Shi Naian', author: '施耐庵', country: 'China', year: 1589, genre: '小说', score: 88, douban: 8.6, nobel: null, blurb: '一百零八好汉的忠义与悲剧。' },
  { title: '论语', original: '论语', en: 'The Analects', enAuthor: 'Confucius', author: '孔子及弟子', country: 'China', year: -450, genre: '哲学', score: 90, douban: 9.1, nobel: null, blurb: '两千年东方伦理的源头。' },
  { title: '道德经', original: '道德经', en: 'Tao Te Ching', enAuthor: 'Laozi', author: '老子', country: 'China', year: -500, genre: '哲学', score: 90, douban: 9.1, nobel: null, blurb: '道法自然的东方智慧。' },
  { title: '呐喊', original: '呐喊', en: 'Call to Arms', enAuthor: 'Lu Xun', author: '鲁迅', country: 'China', year: 1923, genre: '小说', score: 91, douban: 9.0, nobel: null, blurb: '现代中国的精神呐喊。' },
  { title: '围城', original: '围城', en: 'Fortress Besieged', enAuthor: 'Qian Zhongshu', author: '钱钟书', country: 'China', year: 1947, genre: '小说', score: 89, douban: 9.0, nobel: null, blurb: '婚姻与人生的智性讽刺。' },
  { title: '边城', original: '边城', en: 'Border Town', enAuthor: 'Shen Congwen', author: '沈从文', country: 'China', year: 1934, genre: '小说', score: 86, douban: 8.7, nobel: null, blurb: '湘西山水间的纯美与哀愁。' },
  { title: '骆驼祥子', original: '骆驼祥子', en: 'Rickshaw Boy', enAuthor: 'Lao She', author: '老舍', country: 'China', year: 1937, genre: '小说', score: 86, douban: 8.6, nobel: null, blurb: '洋车夫在旧北平的挣扎与沉沦。' },
  { title: '活着', original: '活着', en: 'To Live', enAuthor: 'Yu Hua', author: '余华', country: 'China', year: 1993, genre: '小说', score: 88, douban: 9.4, nobel: null, blurb: '苦难中活下去的坚韧。' },
  { title: '红高粱家族', original: '红高粱家族', en: 'Red Sorghum', enAuthor: 'Mo Yan', author: '莫言', country: 'China', year: 1987, genre: '小说', score: 86, douban: 8.6, nobel: 2012, blurb: '高密乡的野性、血性与生命力。' },
  { title: '平凡的世界', original: '平凡的世界', en: 'Ordinary World', enAuthor: 'Lu Yao', author: '路遥', country: 'China', year: 1986, genre: '小说', score: 86, douban: 9.0, nobel: null, blurb: '黄土地上普通人的奋斗与尊严。' },
  { title: '三体', original: '三体', en: 'The Three-Body Problem', enAuthor: 'Liu Cixin', author: '刘慈欣', country: 'China', year: 2008, genre: '科幻', score: 90, douban: 8.9, nobel: null, blurb: '宇宙尺度下的黑暗森林。' },

  // ————— 韩国 South Korea —————
  { title: '素食者', original: '채식주의자', en: 'The Vegetarian', enAuthor: 'Han Kang', author: '韩江', country: 'South Korea', year: 2007, genre: '小说', score: 84, douban: 7.8, nobel: 2024, blurb: '拒绝进食肉类背后的身体反抗。' },
  { title: '82年生的金智英', original: '82년생 김지영', en: 'Kim Jiyoung, Born 1982', enAuthor: 'Cho Nam-joo', author: '赵南柱', country: 'South Korea', year: 2016, genre: '小说', score: 80, douban: 8.4, nobel: null, blurb: '一位普通女性一生的性别处境。' },

  // ————— 印度 India —————
  { title: '摩诃婆罗多', original: 'महाभारतम्', en: 'The Mahabharata', enAuthor: 'Vyasa', author: '毗耶娑（传）', country: 'India', year: -400, genre: '诗歌', score: 88, douban: 8.9, nobel: null, blurb: '世界最长史诗，家族战争与法理。' },
  { title: '吉檀迦利', original: 'গীতাঞ্জলি', en: 'Gitanjali', enAuthor: 'Rabindranath Tagore', author: '泰戈尔', country: 'India', year: 1910, genre: '诗歌', score: 86, douban: 8.9, nobel: 1913, blurb: '献给神的抒情颂歌。' },
  { title: '午夜之子', original: "Midnight's Children", en: "Midnight's Children", enAuthor: 'Salman Rushdie', author: '萨尔曼·拉什迪', country: 'India', year: 1981, genre: '小说', score: 88, douban: 8.3, nobel: null, blurb: '与国家同生的魔幻寓言。' },
  { title: '微物之神', original: 'The God of Small Things', en: 'The God of Small Things', enAuthor: 'Arundhati Roy', author: '阿兰达蒂·洛伊', country: 'India', year: 1997, genre: '小说', score: 84, douban: 8.4, nobel: null, blurb: '禁忌之爱与种姓创伤。' },

  // ————— 印度尼西亚 Indonesia —————
  { title: '人世间', original: 'Bumi Manusia', en: 'This Earth of Mankind', enAuthor: 'Pramoedya Ananta Toer', author: '普拉姆迪亚', country: 'Indonesia', year: 1980, genre: '小说', score: 82, douban: 8.6, nobel: null, blurb: '殖民地觉醒者的爱与抗争。' },

  // ————— 伊朗 Iran —————
  { title: '盲枭', original: 'بوف کور', en: 'The Blind Owl', enAuthor: 'Sadegh Hedayat', author: '萨迪克·赫达亚特', country: 'Iran', year: 1937, genre: '小说', score: 82, douban: 8.4, nobel: null, blurb: '波斯现代主义的迷梦。' },

  // ————— 土耳其 Turkey —————
  { title: '我的名字叫红', original: 'Benim Adım Kırmızı', en: 'My Name Is Red', enAuthor: 'Orhan Pamuk', author: '奥尔罕·帕慕克', country: 'Turkey', year: 1998, genre: '小说', score: 88, douban: 8.4, nobel: 2006, blurb: '细密画谋杀与东西方之思。' },
  { title: '伊斯坦布尔', original: 'İstanbul', en: 'Istanbul: Memories and the City', enAuthor: 'Orhan Pamuk', author: '奥尔罕·帕慕克', country: 'Turkey', year: 2003, genre: '散文', score: 82, douban: 8.5, nobel: 2006, blurb: '一座城的"呼愁"与忧伤。' },

  // ————— 以色列 Israel —————
  { title: '爱与黑暗的故事', original: 'סיפור על אהבה וחושך', en: 'A Tale of Love and Darkness', enAuthor: 'Amos Oz', author: '阿摩司·奥兹', country: 'Israel', year: 2002, genre: '小说', score: 84, douban: 8.9, nobel: null, blurb: '家族记忆与建国之痛。' },

  // ————— 黎巴嫩 Lebanon —————
  { title: '先知', original: 'The Prophet', en: 'The Prophet', enAuthor: 'Kahlil Gibran', author: '纪伯伦', country: 'Lebanon', year: 1923, genre: '诗歌', score: 85, douban: 8.7, nobel: null, blurb: '关于爱与生的箴言诗。' },

  // ————— 埃及 Egypt —————
  { title: '宫间街', original: 'بين القصرين', en: 'Palace Walk', enAuthor: 'Naguib Mahfouz', author: '纳吉布·马哈福兹', country: 'Egypt', year: 1956, genre: '小说', score: 85, douban: 8.5, nobel: 1988, blurb: '开罗一家三代的世纪变迁。' },

  // ————— 苏丹 Sudan —————
  { title: '移居北方的时节', original: 'موسم الهجرة إلى الشمال', en: 'Season of Migration to the North', enAuthor: 'Tayeb Salih', author: '塔依卜·萨利赫', country: 'Sudan', year: 1966, genre: '小说', score: 82, douban: 8.4, nobel: null, blurb: '殖民与身份撕扯下的返乡者。' },

  // ————— 尼日利亚 Nigeria —————
  { title: '瓦解', original: 'Things Fall Apart', en: 'Things Fall Apart', enAuthor: 'Chinua Achebe', author: '钦努阿·阿契贝', country: 'Nigeria', year: 1958, genre: '小说', score: 88, douban: 8.4, nobel: null, blurb: '殖民冲击下的部族崩解。' },
  { title: '半轮黄日', original: 'Half of a Yellow Sun', en: 'Half of a Yellow Sun', enAuthor: 'Chimamanda Ngozi Adichie', author: '奇玛曼达·阿迪契', country: 'Nigeria', year: 2006, genre: '小说', score: 83, douban: 8.7, nobel: null, blurb: '比亚法拉战争中的爱与失。' },

  // ————— 坦桑尼亚 Tanzania —————
  { title: '天堂', original: 'Paradise', en: 'Paradise', enAuthor: 'Abdulrazak Gurnah', author: '阿卜杜勒拉扎克·古尔纳', country: 'Tanzania', year: 1994, genre: '小说', score: 81, douban: 7.9, nobel: 2021, blurb: '东非少年在殖民前夜的失乐园。' },

  // ————— 肯尼亚 Kenya —————
  { title: '一粒麦种', original: 'A Grain of Wheat', en: 'A Grain of Wheat', enAuthor: "Ngugi wa Thiong'o", author: '恩古吉·瓦·提安戈', country: 'Kenya', year: 1967, genre: '小说', score: 80, douban: 8.0, nobel: null, blurb: '独立前夕的背叛与信念。' },

  // ————— 南非 South Africa —————
  { title: '耻', original: 'Disgrace', en: 'Disgrace', enAuthor: 'J.M. Coetzee', author: 'J.M.库切', country: 'South Africa', year: 1999, genre: '小说', score: 86, douban: 8.7, nobel: 2003, blurb: '后种族隔离时代的耻辱与救赎。' },

  // ————— 澳大利亚 Australia —————
  { title: '荆棘鸟', original: 'The Thorn Birds', en: 'The Thorn Birds', enAuthor: 'Colleen McCullough', author: '考琳·麦卡洛', country: 'Australia', year: 1977, genre: '小说', score: 82, douban: 8.9, nobel: null, blurb: '禁忌之爱的家族传奇。' },

  // ————— 阿富汗 Afghanistan —————
  { title: '追风筝的人', original: 'The Kite Runner', en: 'The Kite Runner', enAuthor: 'Khaled Hosseini', author: '卡勒德·胡赛尼', country: 'Afghanistan', year: 2003, genre: '小说', score: 85, douban: 8.9, nobel: null, blurb: '背叛与救赎的成长故事。' },
]

function eraOf(year) {
  if (year <= 1600) return '古典'
  if (year <= 1899) return '近代'
  if (year <= 1969) return '现代'
  return '当代'
}

// 稳定的封面 slug（与 id 无关，扩充书单也不会错位）
export function coverSlug(book) {
  return (book.en || book.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const books = raw
  .slice()
  .sort((a, b) => b.score - a.score)
  .map((b, i) => ({ ...b, id: i + 1, rank: i + 1, era: eraOf(b.year), slug: coverSlug(b) }))

export const GENRES = ['小说', '诗歌', '戏剧', '散文', '科幻', '儿童', '哲学', '纪实']
export const ERAS = ['古典', '近代', '现代', '当代']

export const byCountry = books.reduce((acc, b) => {
  if (!acc[b.country]) acc[b.country] = { name: b.country, books: [], count: 0 }
  acc[b.country].books.push(b)
  acc[b.country].count += 1
  return acc
}, {})
Object.values(byCountry).forEach((c) => c.books.sort((a, b) => b.score - a.score))

export const maxCount = Math.max(...Object.values(byCountry).map((c) => c.count))

export const COUNTRY_CN = {
  France: '法国', 'United Kingdom': '英国', Ireland: '爱尔兰', Russia: '俄罗斯',
  Germany: '德国', Switzerland: '瑞士', Austria: '奥地利', Czechia: '捷克',
  Italy: '意大利', Spain: '西班牙', Portugal: '葡萄牙', Greece: '希腊',
  Netherlands: '荷兰', Belgium: '比利时', Norway: '挪威', Sweden: '瑞典',
  Denmark: '丹麦', Finland: '芬兰', Iceland: '冰岛', Poland: '波兰',
  Hungary: '匈牙利', Belarus: '白俄罗斯', Colombia: '哥伦比亚', Argentina: '阿根廷',
  Chile: '智利', Peru: '秘鲁', Guatemala: '危地马拉', Brazil: '巴西',
  Mexico: '墨西哥', 'United States of America': '美国', Canada: '加拿大',
  Japan: '日本', China: '中国', 'South Korea': '韩国', India: '印度',
  Indonesia: '印度尼西亚', Iran: '伊朗', Turkey: '土耳其', Israel: '以色列',
  Lebanon: '黎巴嫩', Egypt: '埃及', Sudan: '苏丹', Nigeria: '尼日利亚',
  Tanzania: '坦桑尼亚', Kenya: '肯尼亚', 'South Africa': '南非',
  Australia: '澳大利亚', Afghanistan: '阿富汗',
}

export function cn(country) {
  return COUNTRY_CN[country] || country
}

export function yearLabel(year) {
  return year < 0 ? `公元前 ${-year}` : `${year}`
}

export const GENRE_THEME = {
  小说: { from: '#7d2b2b', to: '#4a1414', ink: '#f4e3c8' },
  诗歌: { from: '#2b4a7d', to: '#152a4a', ink: '#e6ecf7' },
  戏剧: { from: '#5f2b6b', to: '#341542', ink: '#f0e2f4' },
  散文: { from: '#2b6b5a', to: '#153a30', ink: '#e0f2ea' },
  科幻: { from: '#1f5a6b', to: '#0f2f3d', ink: '#d8f0f4' },
  儿童: { from: '#b9821f', to: '#7a5310', ink: '#fff4d8' },
  哲学: { from: '#44465c', to: '#25263a', ink: '#e8e9f2' },
  纪实: { from: '#6b5230', to: '#3d2f18', ink: '#f4e8d2' },
}
export function theme(genre) {
  return GENRE_THEME[genre] || GENRE_THEME['小说']
}
