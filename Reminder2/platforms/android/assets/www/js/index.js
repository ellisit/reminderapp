


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    
    onDeviceReady: function() {
            cordova.plugins.notification.local.requestPermission();
            cordova.plugins.backgroundMode.enable();
            cordova.plugins.backgroundMode.moveToBackground();
            cordova.plugins.backgroundMode.overrideBackButton();
           setInterval(this.alarm, 1000);

        $('#set').click( function(){
           alarm(app.index , "00:00");
            app.addAlarm();
        });

    },

        addZero: function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
        },

        initDate: function(now){
             
                if(!now) {var now = new Date();}
                var h = addZero(now.getHours());
                var m = addZero(now.getMinutes());
                 
                heure = new String();
                heure += h + ":";
                heure += m;
                return heure;
                       
        },

        addAlarm: function(){   
            var data = this.tableauAlarme();  
            data.push("00:00");
            localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
        },



        delete: function(index){
            var data = this.tableauAlarme();  
            data.splice(index, 1);
            localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
        },

        notififcation: function(index){   
            
            cordova.plugins.notification.local.schedule({
                title: 'Alarm',
                text: 'hello',
                foreground: true,
                actions: [{ id: index.toString(), title: 'arrete' }]
            });
            cordova.plugins.backgroundMode.wakeUp();
        },

        index: function(){
            var data = localStorage.getItem('alarme');  
            if (data) {  
                data = JSON.parse(data);
                var lenght = 0;
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        lenght++;
                    }
                }
                return lenght;
            } 
            else return 0;
    
        },

        alarm: function(index, val){
            var clock = $('#clock').val();
            divA = document.createElement('div');
            divA.id = "divAl" + index;
            divA.className = "divA";
            divHour = document.createElement("input");
            divHour.id = "divHours" + index;
            divHour.className = "divHour ";
            divDelete = document.createElement("button");
            divDelete.className = "divDelet ";
            divDelete.id = "divDelete " + index;
            divDelete.textContent = "X";
            $('#alarm').append(divA);
            $('#divHours' + index).setAttribute("val",val);
            $('#divHours' + index).setAttribute("type","time");
            $('#alarm'+index).append(divDelete).onclick = function(){
                var i = 0;
                app.tabAlarme().forEach(function(element){
                    alarm(i,element);
                    i++;
                });
                $(".alarm").empty();
                app.delete(index);
            };
            $('#alarm'+ index).setAttribute("type","submit");
            $('#divAl'+index).prepend(divA);

        },

        alarmDB: function() {
            var data = localStorage.getItem('alarme');  
            if (data) {  
                var validate;
                var index = 0;
                data = JSON.parse(data);
                var date = new Date();
                date = app.heure(date);
                
                data.forEach(function(element){
                    
                    if (element == date && validate) {
                        app.notif(index);
                    }
                    index ++;
                });
            }
        },

        tabAlarme: function(){
            var data = localStorage.getItem('alarme');  
            if (data) {  
                data = JSON.parse(data);
            }
            else data = [];
            return data;
        }

          
    // Update DOM on a Received Event



};

app.initialize();


