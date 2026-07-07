const fs=require("node:fs"),path=require("node:path"),bcrypt=require("bcryptjs"),db=require("../config/db");
const schema=fs.readFileSync(path.join(__dirname,"../../database/schema.sql"),"utf8");
const banks=[
["Bài thi Tin học cơ bản","Kiểm tra kiến thức máy tính, internet và phần mềm.","Tin học",15,"computer",[
["CPU là viết tắt của cụm từ nào?",["Central Processing Unit","Computer Personal Unit","Central Program User","Control Processing User"],0,"CPU là bộ xử lý trung tâm."],
["Thiết bị nào dùng để nhập dữ liệu?",["Màn hình","Bàn phím","Loa","Máy chiếu"],1,"Bàn phím là thiết bị nhập."],
["Hệ điều hành nào do Microsoft phát triển?",["Windows","Ubuntu","Android","macOS"],0,"Windows do Microsoft phát triển."],
["Đơn vị nhỏ nhất của dữ liệu là?",["Byte","Bit","KB","MB"],1,"Bit là đơn vị nhỏ nhất."],
["Trình duyệt web dùng để làm gì?",["Soạn văn bản","Truy cập website","Vẽ kỹ thuật","Nén file"],1,"Trình duyệt giúp truy cập website."]]],
["Bài thi HTML/CSS","Kiểm tra kiến thức xây dựng giao diện website.","Lập trình web",20,"htmlcss",[
["HTML dùng để làm gì?",["Tạo cấu trúc web","Quản trị database","Nén ảnh","Tạo hệ điều hành"],0,"HTML mô tả cấu trúc trang."],
["CSS dùng để làm gì?",["Xử lý server","Định dạng giao diện","Lưu dữ liệu","Gửi email"],1,"CSS định dạng giao diện."],
["Thẻ tạo liên kết là?",["<p>","<a>","<img>","<div>"],1,"Thẻ a tạo liên kết."],
["Thuộc tính CSS đổi màu chữ?",["color","display","margin","width"],0,"color quy định màu chữ."],
["Media query dùng cho?",["Database","Responsive","Xác thực","Mã hóa"],1,"Media query tạo giao diện responsive."]]],
["Bài thi JavaScript cơ bản","Kiểm tra biến, hàm, mảng và DOM.","Lập trình",20,"javascript",[
["Từ khóa khai báo biến có thể gán lại?",["const","let","class","return"],1,"let khai báo biến có thể gán lại."],
["Phương thức thêm phần tử cuối mảng?",["push","pop","shift","slice"],0,"push thêm vào cuối mảng."],
["DOM là viết tắt của?",["Document Object Model","Data Object Map","Digital Order Mode","Document Option Method"],0,"DOM là Document Object Model."],
["Toán tử so sánh nghiêm ngặt?",["==","=","===","!="],2,"=== so sánh cả kiểu và giá trị."],
["JSON.parse dùng để?",["Đổi object thành chuỗi","Đổi chuỗi JSON thành dữ liệu","Tạo HTML","Gọi CSS"],1,"JSON.parse đọc chuỗi JSON."]]],
["Bài thi Tiếng Anh cơ bản","Kiểm tra từ vựng và ngữ pháp cơ bản.","Tiếng Anh",15,"english",[
["She ___ to school every day.",["go","goes","going","gone"],1,"Chủ ngữ số ít dùng goes."],
["Opposite of difficult?",["easy","large","fast","quiet"],0,"Easy trái nghĩa difficult."],
["Greeting in the morning?",["Good night","Good morning","Goodbye","See you"],1,"Good morning dùng buổi sáng."],
["Past tense of go?",["goed","goes","went","gone"],2,"Went là quá khứ của go."],
["A person who teaches is a?",["doctor","teacher","driver","farmer"],1,"Teacher là giáo viên."]]],
["Bài thi Toán tư duy","Kiểm tra tư duy logic và tính toán.","Toán",15,"math",[
["2 + 3 × 4 bằng?",["20","14","24","18"],1,"Nhân trước cộng: 3×4+2=14."],
["Số tiếp theo: 2, 4, 8, 16, ?",["18","24","32","64"],2,"Mỗi số gấp đôi số trước."],
["Nghiệm 2x + 4 = 10?",["2","3","4","5"],1,"2x=6 nên x=3."],
["Tam giác có ba cạnh bằng nhau?",["Vuông","Cân","Đều","Tù"],2,"Tam giác đều có ba cạnh bằng nhau."],
["25% của 80 là?",["15","20","25","30"],1,"80×0.25=20."]]],
["Bài thi Kiến thức chung","Kiểm tra kiến thức xã hội và đời sống.","Kiến thức chung",10,"general",[
["Thủ đô Việt Nam là?",["Hà Nội","Huế","Đà Nẵng","TP.HCM"],0,"Hà Nội là thủ đô Việt Nam."],
["Hành tinh gần Mặt Trời nhất?",["Sao Kim","Sao Hỏa","Sao Thủy","Trái Đất"],2,"Sao Thủy gần Mặt Trời nhất."],
["Nước đóng băng ở bao nhiêu °C?",["0","10","50","100"],0,"Nước đóng băng ở 0°C."],
["Châu lục lớn nhất?",["Châu Âu","Châu Á","Châu Phi","Châu Mỹ"],1,"Châu Á có diện tích lớn nhất."],
["Một năm thường có bao nhiêu ngày?",["360","364","365","366"],2,"Năm thường có 365 ngày."]]]
];
function seed(reset=false){if(reset){db.exec("PRAGMA foreign_keys=OFF; DROP TABLE IF EXISTS attempt_answers;DROP TABLE IF EXISTS quiz_attempts;DROP TABLE IF EXISTS options;DROP TABLE IF EXISTS questions;DROP TABLE IF EXISTS comments;DROP TABLE IF EXISTS contacts;DROP TABLE IF EXISTS quizzes;DROP TABLE IF EXISTS users;DROP TABLE IF EXISTS site_stats;PRAGMA foreign_keys=ON;")}db.exec(schema);if(db.prepare("SELECT id FROM quizzes LIMIT 1").get())return;const addUser=db.prepare("INSERT INTO users(username,password,name,email,role) VALUES(?,?,?,?,?)");const admin=Number(addUser.run("admin",bcrypt.hashSync("admin123",10),"Quản trị viên","admin@quiz.vn","admin").lastInsertRowid);addUser.run("user",bcrypt.hashSync("user123",10),"Người dùng","user@quiz.vn","user");const addQuiz=db.prepare("INSERT INTO quizzes(title,description,category,duration_minutes,image_url,created_by) VALUES(?,?,?,?,?,?)"),addQ=db.prepare("INSERT INTO questions(quiz_id,question_text,explanation,order_index) VALUES(?,?,?,?)"),addO=db.prepare("INSERT INTO options(question_id,option_text,is_correct,order_index) VALUES(?,?,?,?)");banks.forEach(([title,desc,cat,time,seed,questions])=>{const qid=Number(addQuiz.run(title,desc,cat,time,`https://picsum.photos/seed/${seed}/900/560`,admin).lastInsertRowid);questions.forEach((q,i)=>{const id=Number(addQ.run(qid,q[0],q[3],i+1).lastInsertRowid);q[1].forEach((o,j)=>addO.run(id,o,j===q[2]?1:0,j+1))})});db.prepare("INSERT INTO comments(quiz_id,name,email,body,rating) VALUES(1,'Nguyễn Minh Anh','minhanh@example.com','Bài thi rõ ràng và hữu ích.',5)").run();db.prepare("INSERT INTO contacts(name,email,message) VALUES('Lê Phương','phuong@example.com','Mong có thêm nhiều bài thi mới.')").run()}
seed(require.main===module);if(require.main===module)console.log("Đã reset và seed database quiz.");
module.exports=seed;
