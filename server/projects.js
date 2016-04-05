var projects = [
{
    "id": 1,
    "projectname": "Agile",
    "name": "Gol D. Roger",
    "position": "Pirate King",
    "Doing": {"task":2,"estimate":3},
    "Todo": {"task":3,"estimate":6},
},
{
    "id": 2,
    "projectname": "Pupa",
    "name": "Sir Crocodile",
    "position": "Former-Shichibukai",
    "Doing": {"task":2,"estimate":3},
    "Todo": {"task":3,"estimate":6},
},
];
 
/* ฟังก์ชันสำหรับหา user ทั้งหมดในระบบ ในส่วนนี้ผมจะให้ส่งค่า users ทั้งหมดกลับไปเลย */
exports.findAll = function() {
    return projects;
};
 
/* ฟังก์ชันสำหรับหา user จาก id ในส่วนนี้เราจะวน loop หา users ที่มี id ตามที่ระบุแล้วส่งกลับไป */
exports.findById = function (id) {
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].id == id) return projects[i];
    }
};