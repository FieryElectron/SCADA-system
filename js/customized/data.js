var Domain = "method-draw(final)";
var DataPrePath = "../data/";
var NamePrePath = "../data/";

var delim = "|";

// var Domain = "draw";
// var DataPrePath = "/var/tmp/";
// var NamePrePath = "/www3-next/sps/";

class NetWork {
    SplitByteMaxLen = 10000;

    stringSplitBytes(OrgStr) {
        var byteStrArr = [];

        for (var i = 0; i < OrgStr.length; ++i) {
            var str = OrgStr.charCodeAt(i).toString(16);
            if (str.length === 1) {
                str = "0" + str;
            }
            byteStrArr.push(str);
        }
        // console.log(byteStrArr);

        var halfByteArr = [];

        for (var i = 0; i < byteStrArr.length; ++i) {
            halfByteArr.push(parseInt(byteStrArr[i][0], 16));
            halfByteArr.push(parseInt(byteStrArr[i][1], 16));
        }

        // console.log(halfByteArr);

        var halfByteStr = String.fromCharCode(...halfByteArr);

        // console.log(halfByteStr);

        return halfByteStr;
    }

    chunckSplitBytes(fullStr) {
        var len = fullStr.length;
        var tmpStr = "";
        var resStr = "";
        var res = "";

        while (len > 0) {
            if (len > this.SplitByteMaxLen) {
                tmpStr = fullStr.substring(0, this.SplitByteMaxLen);
                res = this.stringSplitBytes(tmpStr);
                resStr += res;
                fullStr = fullStr.substring(this.SplitByteMaxLen);
                len = fullStr.length;
            } else {
                res = this.stringSplitBytes(fullStr);
                resStr += res;
                len = 0;
                break;
            }
        }
        return resStr;
    }

    Create_Promise(mode, filepath, content) {
        var postBodyContent = mode + delim + filepath + delim + content;

        postBodyContent = this.chunckSplitBytes(postBodyContent);

        return new Promise((resolve, reject) => {
            fetch("/" + Domain + "/cgi-bin/file", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'text/plain; charset=UTF-8'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: postBodyContent
            }).then(response => resolve(response));
        });
    }

    async ReadFileAsText(_filePath) {
        return await this.Create_Promise("read", _filePath).then(res => res.text());
    }

    async ReadFileAsArrayBuffer(_filePath) {
        return await this.Create_Promise("read", _filePath).then(res => res.arrayBuffer()).then(arr => new Uint8Array(arr));
    }

    async ReadFileAsBlob(_filePath) {
        return await this.Create_Promise("read", _filePath).then(res => res.arrayBuffer()).then(arr => new Blob([new Uint8Array(arr)], { type: "octet/stream" }));
    }

    async WriteFileFromString(_filePath, _content) {
        return await this.Create_Promise("write", _filePath, _content).then(res => res.text());
    }

    async GetFileInfo(_filePath) {
        var text = await this.Create_Promise("info", _filePath).then(res => res.text());
        text = text.split("|");
        return { ISDIR: text[0], ISREG: text[1], date: text[2] };
    }

    async ListFilesName(_filePath) {
        var text = await this.Create_Promise("list", _filePath).then(res => res.text());
        text = text.split("\n");
        text.pop();
        return text
    }

    async ListAllFilesInfoUnderPath(_filePath) {
        var text = await this.Create_Promise("listall", _filePath).then(res => res.text());
        text = text.split("\n");
        text.pop();
        return text
    }

    async DeleteFile(_filePath) {
        return await this.Create_Promise("delete", _filePath).then(res => res.text());
    }

    async RenameFile(_filePath, _newFilePath) {
        return await this.Create_Promise("rename", _filePath, _newFilePath).then(res => res.text());
    }

    async GetAbsPath(_path) {
        return await this.Create_Promise("path", _path).then(res => res.text());
    }

    async ExecCmd(_cmd) {
        return await this.Create_Promise("cmd", _cmd).then(res => res.text());
    }

    async ReadFilesUnderPathAsText(_filePath) {
        var fileNameArr = await G_NetWork.ListFilesName(_filePath);

        var PromiseArr = [];

        for (var i = 0; i < fileNameArr.length; ++i) {
            // if(fileNameArr[i] === "." || fileNameArr[i] === ".."){
            //     continue;
            // }
            var pro = this.Create_Promise("read", _filePath + fileNameArr[i], "", fileNameArr[i]).then(res => res.text());
            pro.key = fileNameArr[i];
            PromiseArr.push(pro);
        }

        return await Promise.all(PromiseArr).then(resArr => {
            var svgMap = new Map();

            for (var i = 0; i < PromiseArr.length; ++i) {
                svgMap.set(PromiseArr[i].key, resArr[i]);
            }

            return svgMap;
        });
    }

    async ReadFilesUnderPathAsBlob(_filePath) {
        var fileNameArr = await G_NetWork.ListFilesName(_filePath);

        var PromiseArr = [];

        for (var i = 0; i < fileNameArr.length; ++i) {
            // if(fileNameArr[i] === "." || fileNameArr[i] === ".."){
            //     continue;
            // }
            var pro = this.Create_Promise("read", _filePath + fileNameArr[i], "", fileNameArr[i]).then(res => res.arrayBuffer()).then(arr => new Blob([new Uint8Array(arr)], { type: "octet/stream" }));
            pro.key = fileNameArr[i];
            PromiseArr.push(pro);
        }

        return await Promise.all(PromiseArr).then(resArr => {
            var svgMap = new Map();

            for (var i = 0; i < PromiseArr.length; ++i) {
                svgMap.set(PromiseArr[i].key, resArr[i]);
            }

            return svgMap;
        });
    }

    async ReadFilesInfoUnderPath(_filePath) {
        var fileNameArr = await G_NetWork.ListFilesName(_filePath);

        var PromiseArr = [];

        for (var i = 0; i < fileNameArr.length; ++i) {
            // if(fileNameArr[i] === "." || fileNameArr[i] === ".."){
            //     continue;
            // }
            var pro = this.Create_Promise("info", _filePath + fileNameArr[i], "", fileNameArr[i]).then(res => res.text());
            pro.key = fileNameArr[i];
            PromiseArr.push(pro);
        }

        return await Promise.all(PromiseArr).then(resArr => {
            var svgMap = new Map();

            for (var i = 0; i < PromiseArr.length; ++i) {
                svgMap.set(PromiseArr[i].key, resArr[i]);
            }

            return svgMap;
        });
    }
}

class FileManager {
    defaultAbsPath = "";
    path = "./";
    fileMap = new Map();
    selectedFile = null;

    constructor(_name) {
        this.managername = _name;

        this.menu = $('<div class="menu_item"></div>')[0];
        $(this.menu).html(this.managername);
        $("#managermenu").append(this.menu);

        this.menu.belongClass = this;
        this.menu.addEventListener("click", function (e) {
            this.belongClass.open();
        }, false);

        this.title = $('<h1 class="filemanager_title"></h1>')[0];
        $(this.title).html(this.managername);

        this.mask = $('<div class="filemanager_mask"></div>')[0];
        this.widget = $('<div class="filemanager_widget"></div>')[0];
        this.rightMenu = $('<div class="filemanager_rightmenu"></div>')[0];

        this.renameBtn = $('<div class="filemanager_rightmenu_btn">Rename</div>')[0];
        this.deleteBtn = $('<div class="filemanager_rightmenu_btn">Delete</div>')[0];

        this.renameBtn.belongClass = this;
        this.renameBtn.addEventListener("click", function (e) {
            $(this.belongClass.rightMenu).css("display", "none");
            this.belongClass.rename();
        }, false);

        this.deleteBtn.belongClass = this;
        this.deleteBtn.addEventListener("click", function (e) {
            $(this.belongClass.rightMenu).css("display", "none");
            this.belongClass.delete();
        }, false);

        $(this.rightMenu).append(this.renameBtn);
        $(this.rightMenu).append(this.deleteBtn);

        this.pathInput = $('<input class="filemanager_path" type="text" spellcheck="false">')[0];
        this.listWidget = $('<div class="filemanager_list"></div>')[0];
        this.previewWidget = $('<div class="filemanager_preview"></div>')[0];
        this.nameInput = $('<input class="filemanager_name" type="text">')[0];
        this.closeBtn = $('<input class="filemanager_close" type="button" value="X">')[0];
        this.refreshBtn = $('<input class="filemanager_refresh" type="button" value="Refresh">')[0];
        this.loadBtn = $('<input class="filemanager_load" type="button" value="Load">')[0];
        this.uploadloadBtn = $('<input class="filemanager_upload" type="button" value="Upload">')[0];
        this.saveBtn = $('<input class="filemanager_save" type="button" value="Save">')[0];

        this.file = $('<input type="file" style="display:none;" multiple />')[0];

        $('body').append(this.mask);
        $('body').append(this.widget);
        $('body').append(this.rightMenu);

        $(this.widget).append(this.title);
        $(this.widget).append(this.pathInput);
        $(this.widget).append(this.listWidget);
        $(this.widget).append(this.previewWidget);
        $(this.widget).append(this.nameInput);
        $(this.widget).append(this.closeBtn);
        $(this.widget).append(this.refreshBtn);
        $(this.widget).append(this.uploadloadBtn);
        $(this.widget).append(this.loadBtn);
        $(this.widget).append(this.saveBtn);

        $(this.widget).append(this.file);

        this.file.belongClass = this;
        this.file.addEventListener("change", this.testfileOnChange, false);

        this.refreshBtn.belongClass = this;
        this.refreshBtn.addEventListener("click", async function (e) {
            G_loadingWidget.show();
            await this.belongClass.loadFilesFromPath();
            G_loadingWidget.hide();
        }, false);

        this.closeBtn.belongClass = this;
        this.closeBtn.addEventListener("click", function (e) {
            this.belongClass.close();
        }, false);

        this.widget.belongClass = this;
        this.widget.addEventListener("mousedown", function (e) {
            this.belongClass.widgetMouseDown();
        }, false);

        this.pathInput.belongClass = this;
        this.pathInput.addEventListener("change", function (e) {
            this.belongClass.pathOnChange(this.value);
        }, false);

        this.nameInput.belongClass = this;
        this.nameInput.addEventListener("input", function (e) {
            this.belongClass.trySelectFileByName(this.value);
        }, false);

        this.uploadloadBtn.belongClass = this;
        this.uploadloadBtn.addEventListener("click", function (e) {
            this.belongClass.uploadload();
        }, false);

        this.loadBtn.belongClass = this;
        this.loadBtn.addEventListener("click", function (e) {
            this.belongClass.loadFile();
        }, false);

        this.saveBtn.belongClass = this;
        this.saveBtn.addEventListener("click", function (e) {
            this.belongClass.saveFile();
        }, false);
    }

    async loadFilesFromPath() {
        $(this.pathInput).val(this.path);

        var dataMap = await G_NetWork.ReadFilesUnderPathAsBlob(this.path);
        var infoMap = await G_NetWork.ReadFilesInfoUnderPath(this.path);

        this.fileMap = new Map();

        for (const [key, value] of dataMap.entries()) {
            if (key === "." || key === "..") {
                continue;
            }
            var pro = new Object();
            pro.name = key; //removeFileExtension(key);
            pro.data = value;
            var info = infoMap.get(key);
            info = info.split(delim);
            pro.ISDIR = parseInt(info[0]);
            pro.ISREG = parseInt(info[1]);
            pro.date = info[2];

            this.fileMap.set(pro.name, pro);
        }

        this.fileMap = new Map([...this.fileMap.entries()].sort());

        $(this.listWidget).html("");

        for (const [key, value] of this.fileMap.entries()) {
            this.addFileToList(value);
        }

        this.trySelectFileByName(this.nameInput.value);
    }

    async getAbsPath() {
        var abspath = await G_NetWork.GetAbsPath(this.path);
        this.path = (abspath + "/");
        if (this.defaultAbsPath === "") {
            this.defaultAbsPath = this.path;
        }
    }

    async open() {
        G_loadingWidget.show();
        $(this.mask).css("display", "block");
        $(this.widget).css("display", "block");

        await this.getAbsPath();
        await this.loadFilesFromPath();
        G_loadingWidget.hide();
    }

    exec() {
        // console.log("exec");
    }

    async execFile(_file) {
        if (_file) {
            switch (this.getFileType(_file)) {
                case "file":
                    this.exec();
                    break;
                case "folder":
                    G_loadingWidget.show();
                    $(this.listWidget).html("");
                    this.path += (_file.name + "/");
                    await this.getAbsPath();
                    await this.loadFilesFromPath();
                    G_loadingWidget.hide();
                    break;
                case "folderup":
                    G_loadingWidget.show();
                    $(this.listWidget).html("");
                    this.path += (".." + "/");
                    await this.getAbsPath();
                    await this.loadFilesFromPath();
                    G_loadingWidget.hide();
                    break;
            }
        }
    }

    async deleteFile(_file) {
        await G_NetWork.DeleteFile(this.path + _file.name);
        this.loadFilesFromPath();
    }

    async renameFile(_file, _newname) {
        await G_NetWork.RenameFile(this.path + _file.name, this.path + _newname);
        await this.loadFilesFromPath();
        $(this.nameInput).val(_newname);
        this.trySelectFileByName(_newname);
    }

    async fileOnChange(e) {
        var file_list = e.target.files;

        var promises = [];
        for (let file of file_list) {
            let filePromise = new Promise(resolve => {
                let reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = () => resolve(reader.result);
            });
            filePromise.key = file.name;
            promises.push(filePromise);
        }

        var that = this.belongClass;

        var fileArray = await Promise.all(promises).then(resArr => {
            var resMap = new Map();

            for (var i = 0; i < promises.length; ++i) {
                resMap.set(promises[i].key, resArr[i]);
            }

            return resMap;
        });

        var writepromises = [];

        for (const [name, data] of fileArray.entries()) {
            writepromises.push(G_NetWork.Create_Promise("write", that.path + name, data));
        }

        Promise.all(writepromises).then(resArr => {
            that.loadFilesFromPath();
        });
    }

    async testfileOnChange(e) {
        let file =  e.target.files[0];

        let reader = new FileReader();
      
        // reader.readAsBinaryString(file);
        reader.readAsArrayBuffer(file);
      
        reader.onload = function() {
            sendFile(reader.result);

        };
    }

    close() {
        $(this.mask).css("display", "none");
        $(this.widget).css("display", "none");
        $(this.rightMenu).css("display", "none");
    }

    delete() {
        if (this.selectedFile) {
            var that = this;
            $.confirm("Are you sure to delete the " + this.managername + " " + this.selectedFile.name + "?", function (ok) {
                if (!ok) return false;

                that.deleteFile(that.selectedFile);
            });
        } else {
            $.alert("Please select the " + this.managername + " to be deleted!");
        }
    }

    rename() {
        var that = this;
        $.prompt("Please Input New Name.", this.selectedFile.name, function (name) {
            if (name === false) {
                return;
            }

            var jgpattern = /^[A-Za-z0-9_.]+$/;

            if (!jgpattern.test(name)) {
                $.alert("Invalid name!");
                return;
            } else {
                var exist = that.fileMap.get(name);

                if (exist) {
                    $.alert(name + " already exists!");
                } else {
                    that.renameFile(that.selectedFile, name);
                    $.alert("Renamed as : " + name);
                }
            }
        });
    }

    openRightMenu(e) {
        $(this.rightMenu).css("display", "block");
        $(this.rightMenu).css("left", e.clientX);
        $(this.rightMenu).css("top", e.clientY);
    }

    widgetMouseDown() {
        $(this.rightMenu).css("display", "none");
    }

    uploadload() {
        var that = this;
        $.confirm("File with the same name will be overwrited!", function (ok) {
            if (!ok) return false;
            $(that.file).trigger("click");
        });
    }

    pathOnChange(_newpath) {
        if (_newpath.endsWith("/") === false) {
            _newpath += "/";
        }

        this.path = _newpath;
        this.loadFilesFromPath();
    }

    getFileType(_file) {
        if (_file.name === "..") {
            return "folderup";
        } else if (_file.ISDIR === 1) {
            return "folder";
        } else if (_file.ISREG === 1) {
            return "file";
        }
    }

    getIconData(_type) {
        switch (_type) {
            case "file":
                return '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 404.48 404.48"><path fill="#DADEE0" d="M376.325,87.04c0-16.896-13.824-30.72-30.72-30.72h-230.41c-16.896,0-30.72,13.824-30.72,30.72v286.72c0,16.896,13.824,30.72,30.72,30.72H289.26l87.04-81.92L376.325,87.04z"/><path fill="#1BB7EA" d="M84.475,87.04c0-16.896,13.824-30.72,30.72-30.72h204.81v-25.6c0-16.896-13.824-30.72-30.72-30.72H58.875c-16.896,0-30.72,13.824-30.72,30.72v286.72c0,16.896,13.824,30.72,30.72,30.72h25.6V87.04z"/><path fill="#F2F2F2" d="M319.985,322.56h56.32l-87.04,81.92v-51.2C289.265,336.384,303.089,322.56,319.985,322.56z"/><path fill="#1F4254" d="M161.275,192h138.24c4.245,0,7.68-3.441,7.68-7.68c0-4.244-3.436-7.68-7.68-7.68h-138.24c-4.244,0-7.68,3.436-7.68,7.68C153.595,188.559,157.03,192,161.275,192"/><path fill="#1F4254" d="M161.275,140.8h138.24c4.245,0,7.68-3.441,7.68-7.68c0-4.244-3.436-7.68-7.68-7.68h-138.24c-4.244,0-7.68,3.436-7.68,7.68C153.595,137.359,157.03,140.8,161.275,140.8"/><path fill="#1F4254" d="M161.275,243.2h138.24c4.245,0,7.68-3.441,7.68-7.68c0-4.244-3.436-7.68-7.68-7.68h-138.24c-4.244,0-7.68,3.436-7.68,7.68C153.595,239.759,157.03,243.2,161.275,243.2"/><path fill="#1F4254" d="M161.275,294.4h76.8c4.244,0,7.68-3.441,7.68-7.68c0-4.245-3.436-7.68-7.68-7.68h-76.8c-4.244,0-7.68,3.435-7.68,7.68C153.595,290.959,157.03,294.4,161.275,294.4"/></svg>';
                break;
            case "folder":
                return '<svg width="18" height="18" viewBox="0 0 483.246 483.246" xmlns="http://www.w3.org/2000/svg"><path d="m424.914 143.074v249.748c.008 1.697-.174 3.389-.542 5.045l-1.621 5.404c-4.026 9.237-13.167 15.189-23.243 15.134h-374.098c-11.723-.033-21.911-8.059-24.687-19.448-.516-2.003-.758-4.067-.719-6.135v-306.177c-.023-12.02 9.703-21.783 21.723-21.805h.083 111.249c7.769.027 14.952 4.133 18.918 10.814l26.308 45.591h224.995c12 .052 21.686 9.822 21.634 21.823z" fill="#eaa14e"/><path d="m461.206 180.939c12.173.001 22.041 9.869 22.04 22.042 0 2.193-.328 4.373-.971 6.47l-57.915 188.416-1.621 5.404c-4.026 9.237-13.167 15.189-23.243 15.134h-374.086c-11.723-.033-21.911-8.059-24.687-19.448l60.701-202.33c2.801-9.306 11.368-15.68 21.086-15.688z" fill="#f6b863"/></svg>';
                break;
            case "folderup":
                return '<svg width="18" height="18" viewBox="0 0 483.246 483.246" xmlns="http://www.w3.org/2000/svg"><path d="m424.914 143.074v249.748c.008 1.697-.174 3.389-.542 5.045l-1.621 5.404c-4.026 9.237-13.167 15.189-23.243 15.134h-374.098c-11.723-.033-21.911-8.059-24.687-19.448-.516-2.003-.758-4.067-.719-6.135v-306.177c-.023-12.02 9.703-21.783 21.723-21.805h.083 111.249c7.769.027 14.952 4.133 18.918 10.814l26.308 45.591h224.995c12 .052 21.686 9.822 21.634 21.823z" fill="#eaa14e"/><path d="m461.206 180.939c12.173.001 22.041 9.869 22.04 22.042 0 2.193-.328 4.373-.971 6.47l-57.915 188.416-1.621 5.404c-4.026 9.237-13.167 15.189-23.243 15.134h-374.086c-11.723-.033-21.911-8.059-24.687-19.448l60.701-202.33c2.801-9.306 11.368-15.68 21.086-15.688z" fill="#f6b863"/>    <path d="M234,199 C233,198 230,198 229,199 L157,271 C149,279 149,291 157,299 S177,307 185,299 L213,272 L213,361 C213,371 221,379 231,379 C242,379 250,371 250,361 L250,272 L278,299 C285,307 298,307 306,299 S313,279 306,271 L234,199 z" fill="#455A64" /></svg>';
                break;
        }
    }

    addFileToList(file) {
        var row = $('<div class="filemanager_row"></div>')[0];

        var icon = $(this.getIconData(this.getFileType(file)));

        var nameinput = $('<input class="filemanager_nameinput" type="text" disabled ondragstart="return false" spellcheck="false">')[0];
        var infoinput = $('<input class="filemanager_info" type="text" disabled ondragstart="return false">')[0];

        $(infoinput).css("pointer-events", "none");

        $(nameinput).val(file.name);
        $(infoinput).val(new Date(file.date).toLocaleString('en-GB').replace(",", " "));
        $(this.listWidget).append(row);
        $(row).append(icon);
        $(row).append(nameinput);
        $(row).append(infoinput);

        file.row = row;
        file.nameinput = nameinput;

        nameinput.file = file;
        nameinput.belongClass = this;
        nameinput.addEventListener("mouseup", this.rowMouseUp, false);
        row.belongClass = this;
        row.addEventListener("mouseup", this.rowMouseUp, false);

        row.addEventListener("dblclick", this.dbclickFileRow, false);

        nameinput.parent = row[0];
        row.key = file.name;
    }

    rowMouseUp(e) {
        e.stopPropagation();

        this.belongClass.selectFileRow(this);

        if (e.button === 2) {
            if (this.belongClass.getFileType(this.belongClass.selectedFile) != "folderup") {
                this.belongClass.openRightMenu(e);
            }
        }
    }

    dbclickFileRow(e) {
        e.stopPropagation();
        var row = this;
        if (row.parent) {
            row = row.parent
        }

        var file = this.belongClass.fileMap.get(row.key);

        if (file) {
            this.belongClass.execFile(file);
        }
    }

    selectFileRow(that) {

        var row = that;
        if (row.parent) {
            row = row.parent
        }

        var file = this.fileMap.get(row.key);

        if (file) {
            this.setSelectedFile(file);
        }
    }

    setSelectedFile(_file) {
        if (_file === this.selectedFile) {
            return;
        }
        if (this.selectedFile) {
            this.selectedFile.row.classList.remove("filemanager_selected_row");
        }
        this.selectedFile = null;
        $(this.previewWidget).html("");

        if (_file) {
            this.selectedFile = _file;
            this.selectedFile.row.classList.add("filemanager_selected_row");
            $(this.nameInput).val(this.selectedFile.name);

            this.updatePreview();
        }
    }

    updatePreview() {
        // var parser = new DOMParser();
        // var doc = parser.parseFromString(this.selectedFile.data, "image/svg+xml");

        // var svg = $(doc).children()[0];
        // var width = $(svg).attr("width");
        // var height = $(svg).attr("height");
        // $(svg).attr("width", "352");
        // $(svg).attr("height", "198");
        // $(svg).attr("viewBox", "0 0 " + width + " " + height);
        // $(svg).find("title").remove();

        // $(this.previewWidget).append(svg);
    }

    trySelectFileByName(_name) {
        var respro = this.fileMap.get(_name);
        if (respro) {
            this.setSelectedFile(respro);
        } else {
            this.setSelectedFile(null);
        }
    }

    loadFile() {
        console.log("loadFile pls overrite me!!!");
    }

    saveFile() {
        console.log("saveFile pls overrite me!!!");
    }
}

class ImageManager extends FileManager {
    AllImageMap = new Map();
    AllImageListMap = new Map();
    path = "../img/";
    newImageData = null;

    constructor(_name) {
        super(_name);

        $(this.file).attr("accept", "image/*");
        $(this.saveBtn).css("display", "none");
        $(this.uploadloadBtn).css("left", "36%");

        // this.loadAllImagesFromPath();
        this.loadImagesList();
    }

    async loadImagesList() {
        G_loadingWidget.show();
        this.newImageData = await G_NetWork.ReadFileAsBlob("../images/neues_objekt.gif");
        var text = await G_NetWork.ExecCmd("ls ../img -la -R");
        var folders = text.split("\n\n");
        for (var i = 0; i < folders.length; ++i) {
            var foldertext = folders[i];
            foldertext = foldertext.split("\n");

            var foldertext = foldertext.filter(function (el) {
                return el != "";
            });

            var prePath = foldertext[0]
            prePath = prePath.replace(":", "");
            prePath += "/";

            for (var j = 2; j < foldertext.length; ++j) {
                var filetext = foldertext[j];
                filetext = filetext.split(" ");
                var filetext = filetext.filter(function (el) {
                    return el != "";
                });
                if (filetext[8] === "." || filetext[8] === "..") {
                    continue;
                }

                var ext = getFileExtension(filetext[8]).toLowerCase();

                if (!(ext === "png" || ext === "jpg" || ext === "gif")) {
                    continue;
                }
                filetext.splice(0, 5);
                var fileObj = new Object();
                fileObj.month = filetext[0];
                fileObj.day = filetext[1];
                fileObj.hourminute = filetext[2];
                fileObj.name = filetext[3];
                fileObj.prepath = prePath;
                this.AllImageListMap.set(fileObj.name, fileObj);
            }
        }

        this.AllImageListMap = new Map([...this.AllImageListMap.entries()].sort());

        $(".imgselect").html("");
        $(".imgselect").append($("<option value='null'>-- keine --</option>"));
        for (const [key, obj] of this.AllImageListMap.entries()) {
            var path = obj.prepath;
            path = path.replace(this.path, "");

            $(".imgselect").append($("<option value=" + obj.name + ">" + path + obj.name + "</option>"));
        }

        G_loadingWidget.hide();
    }

    async loadAllImagesFromPath() {
        G_loadingWidget.show();
        this.newImageData = await G_NetWork.ReadFileAsBlob("../images/neues_objekt.gif");
        await this.loadAllFilesFromPath();

        this.AllImageMap = new Map([...this.AllImageMap.entries()].sort());

        $(".imgselect").html("");
        $(".imgselect").append($("<option value='null'>-- keine --</option>"));
        for (const [key, obj] of this.AllImageMap.entries()) {
            $(".imgselect").append($("<option value=" + obj.name + ">" + obj.name + "</option>"));
        }
        G_loadingWidget.hide();
    }

    async loadAllFilesFromPath(_path) {
        var path = "";
        if (_path) {
            path = _path;
        } else {
            path = this.path;
        }

        var relativePath = path.replace(this.path, "/");

        var dataMap = await G_NetWork.ReadFilesUnderPathAsBlob(path);
        var infoMap = await G_NetWork.ReadFilesInfoUnderPath(path);

        for (const [key, value] of dataMap.entries()) {
            if (key === "." || key === "..") {
                continue;
            }

            var pro = new Object();
            pro.name = key;
            pro.data = value;
            var info = infoMap.get(key);
            info = info.split(delim);
            pro.ISDIR = parseInt(info[0]);
            pro.ISREG = parseInt(info[1]);
            pro.date = info[2];
            pro.relativePath = relativePath;

            if (pro.ISDIR === 1) {
                await this.loadAllFilesFromPath(path + pro.name + "/");
            } else {
                this.AllImageMap.set(pro.name, pro);
            }
        }
    }

    async loadFilesFromPath() {
        $(this.pathInput).val(this.path);

        var infoArr = await G_NetWork.ListAllFilesInfoUnderPath(this.path);
        this.fileMap = new Map();

        for (var i = 0; i < infoArr.length; ++i) {
            var fileinfo = infoArr[i];
            fileinfo = fileinfo.split(delim);

            if (fileinfo[0] === ".") {
                continue;
            }

            if (fileinfo[0] === "..") {
                if (this.defaultAbsPath === this.path) {
                    continue;
                }
            }

            var pro = new Object();
            pro.name = fileinfo[0];
            pro.ISDIR = parseInt(fileinfo[1]);
            pro.ISREG = parseInt(fileinfo[2]);
            pro.date = fileinfo[3];
            pro.prepath = this.path;

            this.fileMap.set(pro.name, pro);
        }

        function compare(a, b) {
            if (a[1].ISDIR > b[1].ISDIR) {
                return -1;
            } else {
                return a - b;
            }
        }

        this.fileMap = new Map([...this.fileMap.entries()].sort(compare));

        $(this.listWidget).html("");

        for (const [key, value] of this.fileMap.entries()) {
            this.addFileToList(value);
        }

        this.trySelectFileByName(this.nameInput.value);
    }

    async updatePreview() {
        if (this.selectedFile.name === "." || this.selectedFile.name === "..") {
            return;
        }

        var that = this;

        var reader = new FileReader();
        reader.onloadend = function (e) {
            var img_width = 100;
            var img_height = 100;
            var img = new Image()
            img.src = e.target.result
            document.body.appendChild(img);
            img.onload = function () {
                img_width = img.offsetWidth
                img_height = img.offsetHeight

                var container_w = parseFloat($(that.previewWidget).width());
                var container_h = parseFloat($(that.previewWidget).height());

                var cw_ch = container_w / container_h;
                var pw_ph = img_width / img_height;

                var rate = 1.0; // p/c
                var real_w = 100;
                var real_h = 100;

                if (cw_ch >= pw_ph) {
                    rate = img_height / container_h;
                } else {
                    rate = img_width / container_w;
                }

                real_h = img_height / rate;
                real_w = img_width / rate;

                var pimg = $('<img width="' + real_w + '" height="' + real_h + '" >');

                $(pimg).css("margin-top", (container_h - real_h) / 2);
                $(pimg).css("margin-left", (container_w - real_w) / 2);

                $(pimg).attr("src", e.target.result);
                $(pimg).attr("alt", that.selectedFile.name);
                $(that.previewWidget).append(pimg);

                document.body.removeChild(img);
            }
        };


        reader.readAsDataURL(await G_NetWork.ReadFileAsBlob(this.selectedFile.prepath + this.selectedFile.name));
    }

    async loadFile() {
        if (this.selectedFile) {
            var that = this;

            var reader = new FileReader();
            reader.onloadend = function (e) {
                // lets insert the new image until we know its dimensions
                function insertNewImage(img_width, img_height) {
                    var newImage = svgCanvas.addSvgElementFromJson({
                        "element": "image",
                        "attr": {
                            "x": 0,
                            "y": 0,
                            "width": img_width,
                            "height": img_height,
                            "id": svgCanvas.getNextId(),
                            "style": "pointer-events:inherit"
                        }
                    });

                    svgCanvas.setHref(newImage, e.target.result);
                    svgCanvas.selectOnly([newImage])
                    svgCanvas.alignSelectedElements("m", "page")
                    svgCanvas.alignSelectedElements("c", "page")
                    //updateContextPanel();
                }
                // put a placeholder img so we know the default dimensions
                var img_width = 100;
                var img_height = 100;
                var img = new Image()
                img.src = e.target.result
                document.body.appendChild(img);
                img.onload = function () {
                    img_width = img.offsetWidth
                    img_height = img.offsetHeight
                    insertNewImage(img_width, img_height);
                    document.body.removeChild(img);
                }
            };
            reader.readAsDataURL(await G_NetWork.ReadFileAsBlob(this.selectedFile.prepath + this.selectedFile.name));
            that.close();
        } else {
            $.alert("Please select the " + this.managername + " to be loaded!");
        }

        // if (this.selectedFile && this.selectedFile.data) {
        //     var that = this;
        //     $.confirm("Are you sure to load the " + this.managername + " " + this.selectedFile.name + "?", function(ok) {
        //         if (!ok) return false;

        //         var reader = new FileReader();
        //         reader.onloadend = function(e) {
        //             // lets insert the new image until we know its dimensions
        //             function insertNewImage(img_width, img_height) {
        //                 var newImage = svgCanvas.addSvgElementFromJson({
        //                     "element": "image",
        //                     "attr": {
        //                         "x": 0,
        //                         "y": 0,
        //                         "width": img_width,
        //                         "height": img_height,
        //                         "id": svgCanvas.getNextId(),
        //                         "style": "pointer-events:inherit"
        //                     }
        //                 });

        //                 svgCanvas.setHref(newImage, e.target.result);
        //                 svgCanvas.selectOnly([newImage])
        //                 svgCanvas.alignSelectedElements("m", "page")
        //                 svgCanvas.alignSelectedElements("c", "page")
        //                     //updateContextPanel();
        //             }
        //             // put a placeholder img so we know the default dimensions
        //             var img_width = 100;
        //             var img_height = 100;
        //             var img = new Image()
        //             img.src = e.target.result
        //             document.body.appendChild(img);
        //             img.onload = function() {
        //                 img_width = img.offsetWidth
        //                 img_height = img.offsetHeight
        //                 insertNewImage(img_width, img_height);
        //                 document.body.removeChild(img);
        //             }
        //         };
        //         reader.readAsDataURL(that.selectedFile.data);
        //         that.close();

        //     });
        // } else {
        //     $.alert("Please select the " + this.managername + " to be loaded!");
        // }

    }
}

class ProjectManager extends FileManager {
    path = "../projects/svgs/";

    constructor(_name) {
        super(_name);

        this.goToHtmlBtn = $('<input class="filemanager_html" type="button" value="Goto Html">')[0];
        $(this.widget).append(this.goToHtmlBtn);

        this.goToHtmlBtn.belongClass = this;
        this.goToHtmlBtn.addEventListener("click", function (e) {
            this.belongClass.goToHtml();
        }, false);

        $(this.uploadloadBtn).css("display", "none");
    }

    async loadFilesFromPath() {
        $(this.pathInput).val(this.path);

        var infoArr = await G_NetWork.ListAllFilesInfoUnderPath(this.path);

        this.fileMap = new Map();

        for (var i = 0; i < infoArr.length; ++i) {
            var fileinfo = infoArr[i];
            fileinfo = fileinfo.split(delim);

            if (fileinfo[0] === "." || fileinfo[0] === "..") {
                continue;
            }

            var pro = new Object();
            pro.name = removeFileExtension(fileinfo[0]);
            pro.ISDIR = parseInt(fileinfo[1]);
            pro.ISREG = parseInt(fileinfo[2]);
            pro.date = fileinfo[3];
            pro.prepath = this.path;

            this.fileMap.set(pro.name, pro);
        }

        this.fileMap = new Map([...this.fileMap.entries()].sort());

        $(this.listWidget).html("");

        for (const [key, value] of this.fileMap.entries()) {
            this.addFileToList(value);
        }

        this.trySelectFileByName(this.nameInput.value);
    }

    async deleteFile(_file) {
        await G_NetWork.DeleteFile(this.path + _file.name + ".svg");
        await G_NetWork.DeleteFile(this.path + "../htmls/" + _file.name + ".html");
        this.loadFilesFromPath();
    }

    async renameFile(_file, _newname) {
        await G_NetWork.RenameFile(this.path + _file.name + ".svg", this.path + _newname + ".svg");
        await G_NetWork.RenameFile(this.path + "../htmls/" + _file.name + ".html", this.path + "../htmls/" + _newname + ".html");
        await this.loadFilesFromPath();
        $(this.nameInput).val(_newname);
        this.trySelectFileByName(_newname);
    }

    loadFile() {
        if (this.selectedFile) {
            var that = this;
            $.confirm("Are you sure to clear the current " + this.managername + " and load the " + this.managername + " " + this.selectedFile.name + "?", async function (ok) {
                if (!ok) return false;

                svgCanvas.clear();

                svgCanvas.setSvgString(await G_NetWork.ReadFileAsText(that.selectedFile.prepath + that.selectedFile.name + ".svg"));
                that.close();
            });
        } else {
            $.alert("Please select the " + this.managername + " to be loaded!");
        }
    }

    saveFile() {
        var name = $(this.nameInput).val();
        var that = this;

        if (this.selectedFile) {
            $.confirm("The " + this.managername + " " + this.selectedFile.name + " already exists, are you sure you want to overwrite the " + this.managername + "?", async function (ok) {
                if (!ok) return false;

                var str = svgCanvas.svgCanvasToString();
                await G_NetWork.WriteFileFromString("../projects/svgs/" + that.selectedFile.name + ".svg", str);
                await G_NetWork.WriteFileFromString("../projects/htmls/" + that.selectedFile.name + ".html", that.GetHtmlCode());

                that.loadFilesFromPath();
            });
        } else {
            var jgpattern = /^[A-Za-z0-9_]+$/;

            if (!jgpattern.test(name)) {
                $.alert("Invalid " + this.managername + " name!");
            } else {
                $.confirm("Save the " + this.managername + " as " + name + "?", async function (ok) {
                    if (!ok) return false;

                    var str = svgCanvas.svgCanvasToString();

                    await G_NetWork.WriteFileFromString("../projects/svgs/" + name + ".svg", str);
                    await G_NetWork.WriteFileFromString("../projects/htmls/" + name + ".html", that.GetHtmlCode());
                    that.loadFilesFromPath();
                });
            }
        }
    }

    async updatePreview() {
        if (this.selectedFile.name === "." || this.selectedFile.name === "..") {
            return;
        }
        var parser = new DOMParser();

        var doc = parser.parseFromString(await G_NetWork.ReadFileAsText(this.selectedFile.prepath + this.selectedFile.name + ".svg"), "image/svg+xml");

        var svg = $(doc).children()[0];
        var width = $(svg).attr("width");
        var height = $(svg).attr("height");
        $(svg).attr("width", "352");
        $(svg).attr("height", "198");
        $(svg).attr("viewBox", "0 0 " + width + " " + height);
        $(svg).find("title").remove();

        $(this.previewWidget).append(svg);
    }

    GetHtmlCode() {
        var copy = $("#svgcontent").clone();

        var div = $('<div></div>');
        $(div).append(copy);

        var Str = $(div).html();

        var preContent = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + name + '</title><style>html,body {padding: 0;margin: 0;}</style><script type="text/javascript" src="../../js/lib/jquery-3.5.1.min.js"></script><link rel="stylesheet" href="../../css/custimized.css" type="text/css" /></head><body>';
        var postContent = '<script>var IsHtmlPage = true;</script><script type="text/javascript" src="../../js/customized/methods.js"></script><script type="text/javascript" src="../../js/customized/data.js"></script><script type="text/javascript" src="../../js/customized/main.js"></script><script type="text/javascript" src="../../js/customized/htmlaligncenter.js"></script></body></html>';

        return (preContent + Str + postContent);
    }

    goToHtml() {
        if (this.selectedFile) {
            window.open(window.location.href + "projects/htmls/" + this.selectedFile.name + ".html");
            // var that = this;
            // $.confirm("Are you sure to go the " + this.selectedFile.name + ".html?", function (ok) {
            //     if (!ok) return false;

            //     window.open(window.location.href + "projects/htmls/" + that.selectedFile.name + ".html");

            //     // window.location.href += "projects/htmls/"+that.selectedFile.name + ".html";
            // });
        } else {
            $.confirm("Pls select project first!");
        }
    }

    exec() {
        if (this.selectedFile) {
            var that = this;
            $.confirm("Are you sure to go the " + this.selectedFile.name + ".html?", function (ok) {
                if (!ok) return false;

                window.open(window.location.href + "projects/htmls/" + that.selectedFile.name + ".html");

                // window.location.href += "projects/htmls/"+that.selectedFile.name + ".html";
            });
        }
    }
}

class Data_Root {
    eleAttrMap = new Map();
    toolSvgMap = new Map();
    libraryMap = new Map();
    dataAttribute = "class";

    data_point_list = [];
    sps_data_base = [];

    constructor() {
        this.getToolSvgMap();
        this.getEleAttrMap();
    }

    importDefaultGraphc() {
        var data = G_Image.newImageData;

        var reader = new FileReader();
        reader.onloadend = function (e) {
            // lets insert the new image until we know its dimensions
            function insertNewImage(img_width, img_height) {
                var newImage = svgCanvas.addSvgElementFromJson({
                    "element": "image",
                    "attr": {
                        "x": 0,
                        "y": 0,
                        "width": 100,
                        "height": 100,
                        "id": svgCanvas.getNextId(),
                        "style": "pointer-events:inherit"
                    }
                });

                svgCanvas.setHref(newImage, e.target.result);
                svgCanvas.selectOnly([newImage]);
                svgCanvas.alignSelectedElements("m", "page");
                svgCanvas.alignSelectedElements("c", "page");

                $(newImage).attr("class", "ctype:graphic;");
                // $(newImage).removeAttr("xlink:href");
                //updateContextPanel();
            }
            // put a placeholder img so we know the default dimensions
            var img_width = 100;
            var img_height = 100;
            var img = new Image()
            img.src = e.target.result
            document.body.appendChild(img);
            img.onload = function () {
                img_width = img.offsetWidth
                img_height = img.offsetHeight
                insertNewImage(img_width, img_height);

                document.body.removeChild(img);
            }
        };
        reader.readAsDataURL(data);

    }

    leftToolClick(that) {
        var MapKey = $(that).attr("MapKey");

        var selectEles = selectedElements;

        selectEles = selectEles.filter(function (el) {
            return el != null;
        });

        if ("graph" === MapKey) {
            this.importDefaultGraphc();
            return;
        }

        var str = this.toolSvgMap.get(MapKey);

        G_Data.importSvgString(str);
    }

    async getEleAttrMap() {
        var eleAttrJson = JSON.parse(await G_NetWork.ReadFileAsText("../conf/elementAttributes.json"));

        for (var attr in eleAttrJson) {
            this.eleAttrMap.set(attr, eleAttrJson[attr]);
        }
    }

    async getToolSvgMap() {
        var toolSvgJson = JSON.parse(await G_NetWork.ReadFileAsText("../conf/toolSvgData.json"));

        for (var attr in toolSvgJson) {
            this.toolSvgMap.set(attr, toolSvgJson[attr]);
        }
    }

    async GetAvailableLibrary() {
        var resSvgMap = await G_NetWork.ReadFilesUnderPathAsText("../library/");
        resSvgMap.delete(".");
        resSvgMap.delete("..");

        for (let [key, value] of this.toolSvgMap) {
            resSvgMap.delete(key + ".svg");
        }

        this.libraryMap = new Map([...resSvgMap.entries()].sort());

        this.AddSvgToToolFlyOut(this.libraryMap, 0, 0, 50, 50);
    }

    async Read_DataPoint_List(callback) {
        var Str_eingaenge = await G_NetWork.ReadFileAsText(NamePrePath + "eingaenge");
        var Str_ausgaenge = await G_NetWork.ReadFileAsText(NamePrePath + "ausgaenge");
        var Str_numerisch = await G_NetWork.ReadFileAsText(NamePrePath + "numerisch");

        var arr = [];
        arr = this.Datapoint_Reader(Str_eingaenge);
        this.data_point_list.push(...arr);

        arr = this.Datapoint_Reader(Str_ausgaenge);
        this.data_point_list.push(...arr);

        arr = this.Datapoint_Reader(Str_numerisch);
        this.data_point_list.push(...arr);

        if (callback) {
            callback(this.data_point_list);
        }
    }

    pr_init = 0;

    setDataValueByName(obj) {
        for (var i = 0; i < this.sps_data_base.length; ++i) {
            if (this.sps_data_base[i].name == obj.name) {
                this.sps_data_base[i].value = obj.value;
            }
        }
    }

    async wrspsGetData() {
        var that = this;

        // function init() {
        //     return new Promise((resolve, reject) => {
        //         if (that.pr_init) { that.pr_init = 0; fetch("/cgi-bin/read_sps.cgi?init").then(response => resolve(response)); }
        //         else fetch("/cgi-bin/read_sps.cgi").then(response => resolve(response));
        //     });
        // }

        function init() {
            return new Promise((resolve, reject) => {
                fetch("/cgi-bin/read_sps.cgi?init").then(response => resolve(response));
            });
        }

        function getChanges() {
            return new Promise((resolve, reject) => {
                fetch("/cgi-bin/read_sps.cgi").then(response => resolve(response));
            });
        }

        function Sps_Reader(arr) {
            var resArr = [];

            for (var i = 0; i < arr.length - 1; i += 7) {
                var obj = new Object();
                obj.name = arr[i];
                obj.value = arr[i + 1];
                resArr.push(obj);
                // console.log(arr[i], arr[i + 1], arr[i + 2], arr[i + 3], arr[i + 4], arr[i + 5], arr[i + 6]);
            }
            return resArr;
        }

        var tx = "";

        if (this.pr_init == 0) {
            tx = await init().then(res => res.text());
        } else {
            tx = await getChanges().then(res => res.text());
        }

        var valArr = $($(tx)[3]).html();
        valArr = valArr.replaceAll("var", "");

        new Function(valArr)();

        if (this.pr_init == 0) {
            this.pr_init = 1;

            var tmp_data_point_list = [];

            tmp_data_point_list.push(...Sps_Reader(AIN_read.split(",")));
            tmp_data_point_list.push(...Sps_Reader(DIN_read.split(",")));
            tmp_data_point_list.push(...Sps_Reader(AOT_read.split(",")));
            tmp_data_point_list.push(...Sps_Reader(DOT_read.split(",")));

            var M_read_val_arr = M_read_val.split(",");
            M_read_val_arr.pop();

            var resArr = [];
            for (var i = 0; i < M_read_val_arr.length; ++i) {
                var obj = new Object();
                obj.name = "M" + i;
                obj.value = M_read_val_arr[i];
                resArr.push(obj);
            }

            tmp_data_point_list.push(...resArr);

            this.sps_data_base = tmp_data_point_list;

        } else {


            if (AIN_read.length > 0) {
                var new_AIN_read = Sps_Reader(AIN_read.split(","));
                for (var i = 0; i < new_AIN_read.length; ++i) {
                    this.setDataValueByName(new_AIN_read[i]);
                }
            }

            if (DIN_read.length > 0) {
                var new_DIN_read = Sps_Reader(DIN_read.split(","));
                for (var i = 0; i < new_DIN_read.length; ++i) {
                    this.setDataValueByName(new_DIN_read[i]);
                }
            }

            if (AOT_read.length > 0) {
                var new_AOT_read = Sps_Reader(AOT_read.split(","));
                for (var i = 0; i < new_AOT_read.length; ++i) {
                    this.setDataValueByName(new_AOT_read[i]);
                }
            }

            if (DOT_read.length > 0) {
                var new_DOT_read = Sps_Reader(DOT_read.split(","));
                for (var i = 0; i < new_DOT_read.length; ++i) {
                    this.setDataValueByName(new_DOT_read[i]);
                }
            }

            if (M_read_val.length > 0) {
                var M_read_val_arr = M_read_val.split(",");
                M_read_val_arr.pop();

                for (var i = 0; i < M_read_val_arr.length; ++i) {
                    var obj = new Object();
                    obj.name = "M" + i;
                    obj.value = M_read_val_arr[i];

                    this.setDataValueByName(obj);
                }
            }
        }
    }

    async Read_DataPoint_Value() {

        // await this.wrspsGetData();
        // return;

        var tmp_data_point_list = [];

        var Str_sps_data_din = await G_NetWork.ReadFileAsText(DataPrePath + "sps_data_din");
        var Str_sps_data_dot = await G_NetWork.ReadFileAsText(DataPrePath + "sps_data_dot");
        var Str_sps_data_ain = await G_NetWork.ReadFileAsText(DataPrePath + "sps_data_ain");
        var Str_sps_data_aot = await G_NetWork.ReadFileAsText(DataPrePath + "sps_data_aot");
        var Str_sps_data_merker = await G_NetWork.ReadFileAsText(DataPrePath + "sps_data_merker");

        var arr = [];
        arr = this.Sps_Reader(Str_sps_data_din);
        tmp_data_point_list.push(...arr);

        arr = this.Sps_Reader(Str_sps_data_dot);
        tmp_data_point_list.push(...arr);

        arr = this.Sps_Reader(Str_sps_data_ain);
        tmp_data_point_list.push(...arr);

        arr = this.Sps_Reader(Str_sps_data_aot);
        tmp_data_point_list.push(...arr);

        var data = Str_sps_data_merker;
        data = data.split(",");
        data.splice(0, 1);
        data.pop();

        arr = [];

        for (var i = 0; i < data.length; ++i) {
            var obj = new Object();

            obj.name = "M" + (i + 1);
            obj.value = data[i];
            arr.push(obj);
        }

        tmp_data_point_list.push(...arr);

        this.sps_data_base = tmp_data_point_list;
    }

    importSvgString(str) {
        svgCanvas.importSvgString(str, true);
        svgCanvas.ungroupSelectedElement()
        svgCanvas.ungroupSelectedElement()
        // svgCanvas.groupSelectedElements()
        svgCanvas.alignSelectedElements("m", "page")
        svgCanvas.alignSelectedElements("c", "page")
        //svgCanvas.ungroupSelectedElement()
    }

    AddSvgToToolFlyOut(map, x, y, w, h) {
        for (let [key, value] of map) {

            var ele = $(value);

            var width = $(ele).attr("width");
            var height = $(ele).attr("height");

            $(ele).attr("MapKey", key);

            $(ele).css("background", 'rgba(50,50,50,0.1)');
            $(ele).css("margin", "5px");

            $(ele).attr("height", "40px");
            $(ele).attr("width", "40px");

            $($(ele)[0]).attr("viewBox", x + " " + y + " " + width + " " + height);

            $(ele)[0].belongClass = this;
            $(ele)[0].addEventListener("click", this.ImportSvgFromLib, false);
            $(ele)[0].addEventListener("mouseenter", this.LibOnMouseEnter, false);
            $(ele)[0].addEventListener("mouseleave", this.LibOnMouseLeave, false);

            var span = $('<span title="' + key + '"></span>');

            $("#shape_buttons").append(span);
            $(span).append(ele);
        }
    }

    LibOnMouseEnter() {
        var clone = $(this).clone();
        $(clone).attr("width", 352);
        $(clone).attr("height", 352);
        $(clone).css("margin", 0);
        $(G_libPreviewWidget.mask).html(clone);
        G_libPreviewWidget.show();
    }

    LibOnMouseLeave() {
        G_libPreviewWidget.hide();
    }

    ImportSvgFromLib(e) {
        var ele = e.target;

        while (ele && ele.tagName != "svg") {
            ele = ele.parentElement;
        }

        var mapkey = $(ele).attr("MapKey");

        var str = this.belongClass.libraryMap.get(mapkey + "");

        this.belongClass.importSvgString(str);
    }

    Sps_Reader(data) {
        var resArr = [];
        data = data.replace(";", "");
        data = data.split("\n");

        for (var i = 0; i < data.length; ++i) {
            if (data[i].length > 0) {
                var row = data[i];
                var obj = new Object();

                row = row.split("+=");
                obj.type = row[0];
                var content = row[1];
                content = content.replace("'", "");
                obj.args = content.split(",");
                obj.name = obj.args[0];
                obj.value = obj.args[1];

                resArr.push(obj);
            }
        }

        return resArr;
    }

    Datapoint_Reader(data) {
        var resArr = [];
        data = data.split("\n");

        for (var i = 0; i < data.length; ++i) {
            if (data[i].length > 0) {
                var row = data[i];
                var obj = new Object();

                row = row.split("=");
                obj.dp = row[0];
                var content = row[1];
                content = content.split("(");
                obj.type = content[0];
                var args = content[1].replace(")", "");
                obj.args = args.split(",");
                obj.name = obj.args[0];

                if (obj.name.indexOf("I") === 1) {
                    obj.description = obj.args[6];
                } else if (obj.name.indexOf("O") === 1) {
                    obj.description = obj.args[2];
                } else if (obj.name.indexOf("M") === 0) {
                    obj.description = obj.args[5];
                }

                // console.log(dp,delim,type,delim,arg);
                resArr.push(obj);
            }
        }

        return resArr;
    }

    SaveToLibrary() {
        var that = this;
        if (selectedElements.length != 1 || !selectedElements[0]) {
            $.alert("Please select svg first!");
            return;
        } else {
            $.prompt("Please Input Library Name.", "", function (name) {
                if (name === false) {
                    return;
                }

                var jgpattern = /^[A-Za-z0-9_]+$/;

                if (!jgpattern.test(name)) {
                    $.alert("Invalid Library name!");
                    return;
                } else {
                    svgCanvas.alignSelectedElements("l", "page")
                    svgCanvas.alignSelectedElements("t", "page")

                    var width = parseInt(selectedElements[0].getBBox().width);
                    var height = parseInt(selectedElements[0].getBBox().height);

                    var copy = $(selectedElements[0]).clone();

                    clickUndo();
                    clickUndo();

                    var svgcontent = $("#svgcontent").clone();
                    $(svgcontent).removeAttr("id");
                    $(svgcontent).html("");
                    $(svgcontent).append(copy);

                    var tParent = $('<div></div>');

                    $(tParent).append(svgcontent);
                    $(svgcontent).attr("width", width);
                    $(svgcontent).attr("height", height);
                    $(svgcontent).attr("viewBox", "0 0 " + width + " " + height);


                    var eleStr = $(tParent).html();

                    G_NetWork.WriteFileFromString("../library/" + name + ".svg", eleStr);

                    $.alert("Library saved as : " + name);
                }
            });
        }
    }

    getMatchFromArr(arr, name) {
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i].name === name) {
                return arr[i];
            }
        }
    }

    getValueFromDatabase(name) {
        var res = this.getMatchFromArr(this.sps_data_base, name);
        if (res) {
            return res.value;
        }

        return "Null";
    }
}

class LoadingWidget {
    loading = true;
    constructor(_name) {
        this.managername = _name;
        this.mask = $('<div style="z-index:1000;" class="filemanager_mask"><span style="display:block;text-align: center;top:40%;position:relative;"><img src="/' + Domain + '/icon/loading.gif" alt="Loading..." width="100" height="100"></span></div>')[0];


        $('body').append(this.mask);
    }

    show() {
        this.loading = true;
        // $(this.mask).css("display", "block");
        $(this.mask).css("display", "none");
    }

    hide() {
        $(this.mask).css("display", "none");
        this.loading = false;
    }
}

class LibPreviewWidget {

    constructor(_name) {
        this.managername = _name;
        this.mask = $('<div style="z-index:999;" class="libpreview_widget"></div>')[0];


        $('body').append(this.mask);
    }

    show() {
        $(this.mask).css("display", "block");
    }

    hide() {
        $(this.mask).css("display", "none");
    }
}

var G_libPreviewWidget = new LibPreviewWidget();
var G_loadingWidget = new LoadingWidget();
var G_NetWork = new NetWork();
var G_Data = new Data_Root();

var G_Image = new ImageManager("Image");
var G_Project = new ProjectManager("Project");




// test();

bShowGrid = false;
function ToggleGrid() {
    bShowGrid = !bShowGrid;
    if (bShowGrid) {
        var lin = null;
        var svgGrid = CreateSVG("svg", { xmlns: "http://www.w3.org/2000/svg", height: 960, width: 1280, id: "svgGrid" });
        for (var y = 0; y < 960; y += 25) {
            lin = CreateSVG("line", { x1: 0, y1: y, x2: 1280, y2: y, stroke: "#808080" });
            $(svgGrid).append(lin);
        }

        for (var x = 0; x < 1280; x += 25) {
            lin = CreateSVG("line", { x1: x, y1: 0, x2: x, y2: 960, stroke: "#808080" });
            $(svgGrid).append(lin);
        }
        $($("#svgcontent").find("g")[0]).append(svgGrid);
    } else {
        $("#svgGrid").remove();
    }


}

function Create_Promise(mode, filepath, content) {//console.log(111);
    var postBodyContent = mode + delim + filepath + delim + content;

    // postBodyContent = G_NetWork.chunckSplitBytes(postBodyContent);

    return new Promise((resolve, reject) => {
        fetch("/" + Domain + "/cgi-bin/test", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'text/plain; charset=UTF-8'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: postBodyContent
        }).then(response => resolve(response));
    });
}

async function sendFile(data){
    data = new Uint8Array(data);
    // console.log();

    // var stt = "";

    // for(var i = 0;i<data.length;++i){
    //     var ass = data.charCodeAt(i).toString(16);
    //     if(ass.length < 2){
    //         ass = "0"+ass;
    //     }
    //     stt += (ass + " ");

    // }
    // console.log(stt);

    // var arrBuf = new Uint8Array(8);
    // arrBuf[0] = 255;

    // console.log(G_Image.path + "logo.png");
    var pre = ("write" + delim + G_Image.path + "logo.png" + delim);
    var preByteArr = new Uint8Array(pre.length);
    for(var i=0;i<pre.length;++i){
        preByteArr[i] = pre.charCodeAt(i);
        // console.log(pre.charCodeAt(i));
    }
    console.log(preByteArr);



    var c = new Uint8Array(preByteArr.length + data.length);
    c.set(preByteArr);
    c.set(data, preByteArr.length);
    
    test(c);
    // let res = await Create_Promise("write", G_Image.path + "logo.png", data).then(res => res.text());
    // console.log(res);
}

function unpack(str) {
    var bytes = [];
    for(var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        bytes.push(char >>> 8);
        bytes.push(char & 0xFF);
    }
    return bytes;
}


function stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for(var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if(c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;


}


 function byteToString(arr) {
    if(typeof arr === 'string') {
        return arr;
    }
    var str = '',
        _arr = arr;
    for(var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if(v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for(var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else {
            str += String.fromCharCode(_arr[i]);
        }
    }
    return str;
}

function test(btext){
    var arrBuf = new Uint8Array(8);
    arrBuf[0] = 255;
    arrBuf[1] = 2;
    arrBuf[2] = 3;
    arrBuf[3] = 4;
    // btext = arrBuf;
    console.log(btext);


    fetch("/" + Domain + "/cgi-bin/test", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'text/plain; charset=UTF-8'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: btext
    }).then(response => response.text())
    .then(data => console.log(data));
}

