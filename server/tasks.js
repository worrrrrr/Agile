
var tasks=[
{ "id":1,
  "uid":1,
  "pid":1,
  "tasktitle":"NODE/GIT",
  "description":"Install and Setup",
  "sprint":1,
  "estimate":2,
  "state":"Done",
  "priority":"High",
  "flag":0
},
{ "id":2,
  "uid":2,
  "pid":1,
  "tasktitle":"Determine Server-side",
  "description":"Determine Server-side Technology",
  "sprint":1,
  "estimate":1,
  "state":"Done",
  "priority":"High",
  "flag":0
},
{ "id":3,
  "uid":1,
  "pid":1,
  "tasktitle":"Design DataModel",
  "description":"Design DataModel",
  "sprint":1,
  "estimate":2,
  "state":"Done",
  "priority":"High",
  "flag":0
},
{ "id":4,
  "uid":2,
  "pid":1,
  "tasktitle":"Determine Database",
  "description":"Determine",
  "sprint":1,
  "estimate":2,
  "state":"Doing",
  "priority":"High",
  "flag":1
},
{ "id":5,
  "uid":2,
  "pid":1,
  "tasktitle":"Determine Client-Server",
  "description":"Client-Server Communication ",
  "sprint":1,
  "estimate":2,
  "state":"Doing",
  "priority":"High",
  "flag":1
},
{ "id":6,
  "uid":1,
  "pid":1,
  "tasktitle":"Basic Client",
  "description":"This is Task 6",
  "sprint":1,
  "estimate":2,
  "state":"Todo",
  "priority":"Medium",
  "flag":0
},
{ "id":7,
  "uid":2,
  "pid":1,
  "tasktitle":"Basic Server-side",
  "description":"This is Task 7",
  "sprint":1,
  "estimate":2,
  "state":"Todo",
  "priority":"Medium",
  "flag":0
}
];




exports.findAll = function() {
    return tasks;
};
 
/* ฟังก์ชันสำหรับหา user จาก id ในส่วนนี้เราจะวน loop หา users ที่มี id ตามที่ระบุแล้วส่งกลับไป */
exports.findById = function (id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) return tasks[i];
    }
};


exports.findByUserID = function (uid) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].uid == id) return tasks[i];
    }
};
