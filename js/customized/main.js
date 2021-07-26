class Datapoint {
    constructor(_classparent, _parent) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;"></div>');
        this.namediv = $('<span>Datapoint</span>');
        this.selector = $('<select class="datapointselect" style="float: right;width: 200px;padding: 0;margin: 0;"><option value="null">-- keine --</option></select>');

        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.namediv);
        $(this.maindiv).append(this.selector);

        this.selector[0].belongClass = this;
        this.selector[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setDatapoint(this.belongClass, $(this).val());
        });
    }

    select(value) {
        $(this.selector).find('option[value="' + value + '"]').prop('selected', true);
    }
}

class Datapoint1 {
    constructor(_classparent, _parent) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;"></div>');
        this.namediv = $('<span>Datapoint</span>');
        this.selector = $('<select class="datapointselect" style="float: right;width: 200px;padding: 0;margin: 0;"><option value="null">-- keine --</option></select>');

        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.namediv);
        $(this.maindiv).append(this.selector);

        this.selector[0].belongClass = this;
        this.selector[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setDatapoint(this.belongClass, $(this).val());
        });
    }

    select(value) {
        $(this.selector).find('option[value="' + value + '"]').prop('selected', true);
    }
}

class Datapoint2 {
    constructor(_classparent, _parent) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;"></div>');
        this.namediv = $('<span>Datapoint</span>');
        this.selector = $('<select class="datapointselect" style="float: right;width: 200px;padding: 0;margin: 0;"><option value="null">-- keine --</option></select>');

        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.namediv);
        $(this.maindiv).append(this.selector);

        this.selector[0].belongClass = this;
        this.selector[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setDatapoint(this.belongClass, $(this).val());
        });
    }

    select(value) {
        $(this.selector).find('option[value="' + value + '"]').prop('selected', true);
    }
}

class DP1OffOn {
    constructor(_classparent, _parent) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;">DP1 Off/On</div>');
        this.selector = $('<select style="float: right;width: 200px;padding: 0;margin: 0;"><option value="null">-- keine --</option></select>');

        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.selector);

        this.selector[0].belongClass = this;
        this.selector[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setDatapoint(this.belongClass, $(this).val());
        });
    }

    select(value) {
        $(this.selector).find('option[value="' + value + '"]').prop('selected', true);
    }
}

class DP2Malfunction {
    constructor(_classparent, _parent) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;">DP2 Malfunction</div>');
        this.selector = $('<select style="float: right;width: 200px;padding: 0;margin: 0;"><option value="null">-- keine --</option></select>');

        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.selector);

        this.selector[0].belongClass = this;
        this.selector[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setDatapoint(this.belongClass, $(this).val());
        });
    }

    select(value) {
        $(this.selector).find('option[value="' + value + '"]').prop('selected', true);
    }
}

class DP3Maintenance {
    constructor(_classparent, _parent) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;">DP3 Maintenance</div>');
        this.selector = $('<select style="float: right;width: 200px;padding: 0;margin: 0;"><option value="null">-- keine --</option></select>');

        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.selector);

        this.selector[0].belongClass = this;
        this.selector[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setDatapoint(this.belongClass, $(this).val());
        });
    }

    select(value) {
        $(this.selector).find('option[value="' + value + '"]').prop('selected', true);
    }
}

class BildDPBase {
    constructor(_classparent, _parent, _title) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;">' + _title + '</div>');
        this.selector = $('<select class="imgselect" style="float: right;width: 200px;padding: 0;margin: 0;"><option value="null">-- keine --</option></select>');

        this.previewWidget = $('<div class="little_preview"></div>')[0];

        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.selector);
        $(this.maindiv).append(this.previewWidget);

        this.selector[0].belongClass = this;
        this.selector[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setImage(this.belongClass, $(this).val());
            this.belongClass.updateLittlePreview($(this).val());
        });
    }

    select(value) {
        $(this.selector).find('option[value="' + value + '"]').prop('selected', true);
        this.updateLittlePreview(value);
    }

    async updateLittlePreview(key) {
        $(this.previewWidget).html("");

        var imgListObj = G_Image.AllImageListMap.get(key);
        if (imgListObj) {
            var imgreadpath = imgListObj.prepath + imgListObj.name;

            var data = await G_NetWork.ReadFileAsBlob(imgreadpath);

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
                    $(pimg).attr("alt", key);
                    $(that.previewWidget).append(pimg);

                    document.body.removeChild(img);
                }
            };
            reader.readAsDataURL(data);
        }
    }
}

class BildDP1E0 extends BildDPBase {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Bild DP1 = 0");
    }
}

class BildDP1E1 extends BildDPBase {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Bild DP1 = 1");
    }
}

class BildDP2E1 extends BildDPBase {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Bild DP2 > 0");
    }
}

class BildDP3E1 extends BildDPBase {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Bild DP1 = 0");
    }
}

//----------

class Color {
    baseColorArr = [
        ["#000000", "#800000", "#008000", "#808000", "#000080", "#780080", "#008080", "#FFFFFF"],
        ["#808080", "#FF0000", "#00FF00", "#FFFF00", "#0000FF", "#FF00FF", "#00FFFF", "transparent"],
    ];

    cubeWidth = 12;
    cubeHeight = 12;
    constructor(_classparent, _parent, _title) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;">' + _title + '</div>');
        this.color = $('<input style="float: right;width: 88px;padding: 0;margin: 0;" type="color">');
        this.span = $('<span style="float: right;height: 24px;width:96px;margin-right: 14px;"></span>');
        this.svg = $('<svg style="height: 100%;width:100%"></svg>');

        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.color);
        $(this.maindiv).append(this.span);
        $(this.span).append(this.svg);

        for (var i = 0; i < this.baseColorArr.length; ++i) {
            var colorRow = this.baseColorArr[i];
            for (var j = 0; j < colorRow.length; j++) {
                var colorBlock = CreateSVG("rect", { x: j * this.cubeWidth, y: i * this.cubeHeight, width: this.cubeWidth, height: this.cubeHeight, fill: this.baseColorArr[i][j] });

                colorBlock.belongClass = this;
                colorBlock.addEventListener("click", function (e) {
                    this.belongClass.classparent.setColor(this.belongClass, $(this).attr("fill"));
                    $(this.belongClass.color).val($(this).attr("fill"));
                });

                if (this.baseColorArr[i][j] === "transparent") {
                    var T = CreateSVG("text", { x: j * this.cubeWidth + 3, y: i * this.cubeHeight + 10, "font-size": 10, fill: "#0000FF" });
                    $(T).html("T");
                    $(this.svg).append(T);
                }

                $(this.svg).append(colorBlock);
            }
        }

        this.color[0].belongClass = this;
        this.color[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setColor(this.belongClass, $(this).val());
        });
    }

    setTitle(str) {
        $(this.maindiv)
    }

    setColor(color) {
        $(this.color).val(color);
    }
}

class Textcolor extends Color {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Text-Color");
    }
}

class Backgroundcolor extends Color {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Background-Color");
    }
}

//----------

class TextInput {
    constructor(_classparent, _parent, _title) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;">' + _title + '</div>');
        this.text = $('<input style="float: right;width: 196px;padding: 0;margin: 0;" type="text">');

        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.text);

        this.text[0].belongClass = this;
        this.text[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setText(this.belongClass, $(this).val());
        });
    }

    setText(str) {
        $(this.text).val(str);
    }
}

class Action extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Action");
    }

    execute(datapoint, str) {
        try {
            str = str.split("(");
            var cmd = str[0].toLowerCase();
            var arg = str[1].replace(")", "");

            switch (cmd) {
                case "setpoint":
                    this.setValue(datapoint, arg);
                    break;
                case "goto":
                    this.redirect(arg);
                    break;
            }
        } catch (error) { }
    }

    setValue(datapoint, value) {
        var type = datapoint[0];

        switch (type) {
            case "A":
                this.analogSetValue(datapoint, value);
                break;
            case "D":
                this.digitalSetValue(datapoint, value);
                break;
        }
    }

    digitalSetValue(datapoint, value) {
        console.log("digitalSetValue:", datapoint, "=", value);
    }

    analogSetValue(datapoint, value) {
        if (value.toLowerCase() === "unlock") {
            console.log("unlock:", datapoint, "=", value);
        } else {
            console.log("analogSetValue:", datapoint, "=", value);
        }

    }

    redirect(url) {
        window.location.href = url;
    }
}

class Title extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Title");
    }
}

class MinValue extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Min-Value");
    }
}

class MaxValue extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Max-Value");
    }
}

class Row extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Row");
    }
}

class Col extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Col");
    }
}

class Width extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Width");
    }
}

class Height extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Height");
    }
}

class Border extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Border");
    }
}

class Margin extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Margin");
    }
}

class DescriptionDP1E1 extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Description (DP1== 1)");
    }
}

class DescriptionDP1E0 extends TextInput {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Description (DP1== 0)");
    }
}



//----------

class ShowValue {
    constructor(_classparent, _parent) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;">Show Value</div>');
        this.checkbox = $('<input style="float: right;right:184px;position:relative;" type="checkbox">');

        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.checkbox);

        this.checkbox[0].belongClass = this;
        this.checkbox[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setCheck($(this).is(':checked'));
        });
    }

    setCheck(flag) {
        $(this.checkbox).prop('checked', (flag == "true"));
    }
}

//----------

class ColorRule {
    constructor(_classparent, _parent, _title) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;">' + _title + '</div>');

        this.minvalue = $('<input style="float: right;width: 76px;padding: 0;margin: 0;" type="text">');
        this.color = $('<input style="float: right;width: 38px;height:18px;padding: 0;margin: 0;" type="color">');
        this.maxvalue = $('<input style="float: right;width: 76px;padding: 0;margin: 0;" type="text">');


        $(this.parent).append(this.maindiv);
        $(this.maindiv).append(this.maxvalue);
        $(this.maindiv).append(this.color);
        $(this.maindiv).append(this.minvalue);


        this.minvalue[0].belongClass = this;
        this.minvalue[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setMinValue(this.belongClass, $(this).val());
        });

        this.maxvalue[0].belongClass = this;
        this.maxvalue[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setMaxValue(this.belongClass, $(this).val());
        });

        this.color[0].belongClass = this;
        this.color[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setColor(this.belongClass, $(this).val());
        });
    }

    setMinvalue(value) {
        $(this.minvalue).val(value);
    }

    setMaxvalue(value) {
        $(this.maxvalue).val(value);
    }

    setColor(value) {
        $(this.color).val(value);
    }
}

class ColorRule1 extends ColorRule {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Color Rule 1");
    }
}

class ColorRule2 extends ColorRule {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Color Rule 2");
    }
}

class ColorRule3 extends ColorRule {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Color Rule 3");
    }
}

class ColorRuleOn extends ColorRule {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Color Rule On");
    }
}

class ColorRuleOff extends ColorRule {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Color Rule Off");
    }
}

class BlinkColorRule extends ColorRule {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Blink Color Rule");
    }
}

//----------

class ContentRule {
    constructor(_classparent, _parent, _title) {
        this.classparent = _classparent;
        this.parent = _parent;

        this.maindiv = $('<div style="height: 30px;">' + _title + '</div>');

        this.minvalue = $('<input style="float: right;width: 46px;padding: 0;margin: 0;" type="text">');
        this.content = $('<input style="float: right;width: 96px;padding: 0;margin: 0;" type="text">');
        this.maxvalue = $('<input style="float: right;width: 46px;padding: 0;margin: 0;" type="text">');


        $(this.parent).append(this.maindiv);

        $(this.maindiv).append(this.maxvalue);
        $(this.maindiv).append(this.content);
        $(this.maindiv).append(this.minvalue);

        this.minvalue[0].belongClass = this;
        this.minvalue[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setMinValue(this.belongClass, $(this).val());
        });

        this.maxvalue[0].belongClass = this;
        this.maxvalue[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setMaxValue(this.belongClass, $(this).val());
        });

        this.content[0].belongClass = this;
        this.content[0].addEventListener("change", function (e) {
            this.belongClass.classparent.setContent(this.belongClass, $(this).val());
        });
    }

    setMinvalue(value) {
        $(this.minvalue).val(value);
    }

    setMaxvalue(value) {
        $(this.maxvalue).val(value);
    }

    setContent(content) {
        $(this.content).val(content);
    }
}

class ContentRule1 extends ContentRule {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Content Rule 1");
    }
}

class ContentRule2 extends ContentRule {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Content Rule 2");
    }
}

class ContentRule3 extends ContentRule {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Content Rule 3");
    }
}

class BlinkContentRule extends ContentRule {
    constructor(_classparent, _parent) {
        super(_classparent, _parent, "Blink Content Rule");
    }
}

//----------

class Manager {
    constructor() {
        this.maindiv = $('<div style="position: absolute;border: solid 1px;font-size: 13px;font-family:Arial;background: #E8E8E8;display: none;padding: 10px;height: 100px;width: 100px;left:100px;top:100px;"></div>');
        $("body").append(this.maindiv);

        this.titlediv = $('<div style="font-size: 16px;text-align: center;margin-bottom: 10px;font-weight: bold;"></div>');

        $(this.maindiv).append(this.titlediv);
        $(this.maindiv).append($('<hr>'));
    }

    setTitle(str) {
        $(this.titlediv).html(str);
    }

    setPosition(left, top) {
        $(this.maindiv).css("left", left);
        $(this.maindiv).css("top", top);
    }

    setSize(width, height) {
        $(this.maindiv).css("width", width);
        $(this.maindiv).css("height", height);
    }

    hide() {
        $(this.maindiv).css("display", "none");
    }

    show(x, y, targetgroup, Ori) {
        this.targetgroup = targetgroup;
        $(this.maindiv).css("left", x);
        $(this.maindiv).css("top", y);
        $(this.maindiv).css("display", "block");
        this.AttrMap = Ori.parseDataAttribute($(this.targetgroup).attr(Ori.dataAttribute));

        this.updateInfoToWidget();
    }

    updateInfoToWidget() {
        console.log("pls overwrite me!!");
    }

    updateInfoToDataAttribute() {
        var AttrStr = "";
        this.AttrMap.forEach((value, key) => {
            AttrStr += (key + ":" + value + ";");
        })

        $(this.targetgroup).attr(root.dataAttribute, AttrStr);
    }

    updateInfoToSvg() {
        console.log("pls overwrite me!!");
    }
}

class DataManager extends Manager {
    nameKey = "data";

    constructor(_root) {
        super();

        if (_root && this.nameKey) {
            _root.managerarray.set(this.nameKey, this);
        }

        this.setTitle("Data");
        this.setSize(350, 109);
        this.setPosition(100, 100);

        this.datapoint = new Datapoint(this, this.maindiv);
        this.textcolor = new Textcolor(this, this.maindiv);
        // this.backgroundcolor = new Backgroundcolor(this, this.maindiv);
        this.action = new Action(this, this.maindiv);
    }

    updateInfoToWidget() {
        var datapoint = this.AttrMap.get("datapoint");
        var color = this.AttrMap.get("color");
        var backcolor = this.AttrMap.get("backcolor");
        var action = this.AttrMap.get("action");

        this.datapoint.select(datapoint);
        this.textcolor.setColor(color);
        // this.backgroundcolor.setColor(backcolor);
        this.action.setText(action);
    }

    updateInfoToSvg() {
        $(this.targetgroup).find("text").attr("fill", this.AttrMap.get("color"));
        $(this.targetgroup).find("rect").attr("fill", this.AttrMap.get("backcolor"));
    }

    setDatapoint(classtype, value) {
        if (classtype instanceof Datapoint) {
            this.AttrMap.set("datapoint", value);
        }
        this.updateInfoToDataAttribute();
    }

    setColor(classtype, value) {
        if (classtype instanceof Textcolor) {
            this.AttrMap.set("color", value);
        } else if (classtype instanceof Backgroundcolor) {
            this.AttrMap.set("backcolor", value);
        }

        this.updateInfoToDataAttribute();
        this.updateInfoToSvg()
    }

    setText(classtype, str) {
        if (classtype instanceof Action) {
            this.AttrMap.set("action", str);

            var datapoint = this.AttrMap.get("datapoint");
            // classtype.execute(datapoint, str);
        }
        this.updateInfoToDataAttribute();
    }
}

class TextManager extends Manager {
    nameKey = "text";

    constructor(_root) {
        super();

        if (_root && this.nameKey) {
            _root.managerarray.set(this.nameKey, this);
        }

        this.setTitle("Text");
        this.setSize(400, 229);
        this.setPosition(100, 280);

        this.datapoint = new Datapoint(this, this.maindiv);
        this.textcolor = new Textcolor(this, this.maindiv);
        // this.backgroundcolor = new Backgroundcolor(this, this.maindiv);

        this.contentrule1 = new ContentRule1(this, this.maindiv);
        this.contentrule2 = new ContentRule2(this, this.maindiv);
        this.contentrule3 = new ContentRule3(this, this.maindiv);
        this.blinkcontentrule = new BlinkContentRule(this, this.maindiv);

        this.action = new Action(this, this.maindiv);

    }

    updateInfoToWidget() {
        var datapoint = this.AttrMap.get("datapoint");
        var color = this.AttrMap.get("color");
        var backcolor = this.AttrMap.get("backcolor");
        var action = this.AttrMap.get("action");

        var contentrule1minvalue = this.AttrMap.get("contentrule1minvalue");
        var contentrule1maxvalue = this.AttrMap.get("contentrule1maxvalue");
        var contentrule1content = this.AttrMap.get("contentrule1content");

        var contentrule2minvalue = this.AttrMap.get("contentrule2minvalue");
        var contentrule2maxvalue = this.AttrMap.get("contentrule2maxvalue");
        var contentrule2content = this.AttrMap.get("contentrule2content");

        var contentrule3minvalue = this.AttrMap.get("contentrule3minvalue");
        var contentrule3maxvalue = this.AttrMap.get("contentrule3maxvalue");
        var contentrule3content = this.AttrMap.get("contentrule3content");

        var contentrule3minvalue = this.AttrMap.get("contentrule3minvalue");
        var contentrule3maxvalue = this.AttrMap.get("contentrule3maxvalue");
        var contentrule3content = this.AttrMap.get("contentrule3content");

        var blinkcontentruleminvalue = this.AttrMap.get("blinkcontentruleminvalue");
        var blinkcontentrulemaxvalue = this.AttrMap.get("blinkcontentrulemaxvalue");
        var blinkcontentrulecontent = this.AttrMap.get("blinkcontentrulecontent");


        this.datapoint.select(datapoint);
        this.textcolor.setColor(color);
        // this.backgroundcolor.setColor(backcolor);
        this.action.setText(action);

        this.contentrule1.setMinvalue(contentrule1minvalue);
        this.contentrule1.setMaxvalue(contentrule1maxvalue);
        this.contentrule1.setContent(contentrule1content);

        this.contentrule2.setMinvalue(contentrule2minvalue);
        this.contentrule2.setMaxvalue(contentrule2maxvalue);
        this.contentrule2.setContent(contentrule2content);

        this.contentrule3.setMinvalue(contentrule3minvalue);
        this.contentrule3.setMaxvalue(contentrule3maxvalue);
        this.contentrule3.setContent(contentrule3content);

        this.blinkcontentrule.setMinvalue(blinkcontentruleminvalue);
        this.blinkcontentrule.setMaxvalue(blinkcontentrulemaxvalue);
        this.blinkcontentrule.setContent(blinkcontentrulecontent);
    }

    updateInfoToSvg() {
        $(this.targetgroup).find("text").attr("fill", this.AttrMap.get("color"));
        $(this.targetgroup).find("rect").attr("fill", this.AttrMap.get("backcolor"));
    }


    setDatapoint(classtype, value) {
        if (classtype instanceof Datapoint) {
            this.AttrMap.set("datapoint", value);
        }
        this.updateInfoToDataAttribute();
    }

    setColor(classtype, value) {
        if (classtype instanceof Textcolor) {
            this.AttrMap.set("color", value);
        } else if (classtype instanceof Backgroundcolor) {
            this.AttrMap.set("backcolor", value);
        }

        this.updateInfoToDataAttribute();
        this.updateInfoToSvg()
    }

    setText(classtype, str) {
        if (classtype instanceof Action) {
            this.AttrMap.set("action", str);

            var datapoint = this.AttrMap.get("datapoint");
            // classtype.execute(datapoint, str);
        }
        this.updateInfoToDataAttribute();
    }

    setMinValue(classtype, value) {
        if (classtype instanceof ContentRule1) {
            this.AttrMap.set("contentrule1minvalue", value);
        } else if (classtype instanceof ContentRule2) {
            this.AttrMap.set("contentrule2minvalue", value);
        } else if (classtype instanceof ContentRule3) {
            this.AttrMap.set("contentrule3minvalue", value);
        } else if (classtype instanceof BlinkContentRule) {
            this.AttrMap.set("blinkcontentruleminvalue", value);
        }

        this.updateInfoToDataAttribute();
    }

    setMaxValue(classtype, value) {
        if (classtype instanceof ContentRule1) {
            this.AttrMap.set("contentrule1maxvalue", value);
        } else if (classtype instanceof ContentRule2) {
            this.AttrMap.set("contentrule2maxvalue", value);
        } else if (classtype instanceof ContentRule3) {
            this.AttrMap.set("contentrule3maxvalue", value);
        } else if (classtype instanceof BlinkContentRule) {
            this.AttrMap.set("blinkcontentrulemaxvalue", value);
        }

        this.updateInfoToDataAttribute();
    }

    setContent(classtype, content) {
        if (classtype instanceof ContentRule1) {
            this.AttrMap.set("contentrule1content", content);
        } else if (classtype instanceof ContentRule2) {
            this.AttrMap.set("contentrule2content", content);
        } else if (classtype instanceof ContentRule3) {
            this.AttrMap.set("contentrule3content", content);
        } else if (classtype instanceof BlinkContentRule) {
            this.AttrMap.set("blinkcontentrulecontent", content);
        }

        this.updateInfoToDataAttribute();
    }
}

class BarManager extends Manager {
    nameKey = "bar";

    constructor(_root) {
        super();

        if (_root && this.nameKey) {
            _root.managerarray.set(this.nameKey, this);
        }

        this.setTitle("Bar");
        this.setSize(400, 290);
        this.setPosition(600, 700);

        this.datapoint = new Datapoint(this, this.maindiv);
        this.textcolor = new Textcolor(this, this.maindiv);
        this.backgroundcolor = new Backgroundcolor(this, this.maindiv);
        this.colorrule1 = new ColorRule1(this, this.maindiv);
        this.colorrule2 = new ColorRule2(this, this.maindiv);
        this.colorrule3 = new ColorRule3(this, this.maindiv);
        this.minvalue = new MinValue(this, this.maindiv);
        this.maxvalue = new MaxValue(this, this.maindiv);
        this.showvalue = new ShowValue(this, this.maindiv);
    }

    updateInfoToWidget() {
        var datapoint = this.AttrMap.get("datapoint");
        var color = this.AttrMap.get("color");
        var backcolor = this.AttrMap.get("backcolor");
        var minvalue = this.AttrMap.get("minvalue");
        var maxvalue = this.AttrMap.get("maxvalue");
        var showvalue = this.AttrMap.get("showvalue");

        var colorrule1minvalue = this.AttrMap.get("colorrule1minvalue");
        var colorrule1maxvalue = this.AttrMap.get("colorrule1maxvalue");
        var colorrule1color = this.AttrMap.get("colorrule1color");

        var colorrule2minvalue = this.AttrMap.get("colorrule2minvalue");
        var colorrule2maxvalue = this.AttrMap.get("colorrule2maxvalue");
        var colorrule2color = this.AttrMap.get("colorrule2color");

        var colorrule3minvalue = this.AttrMap.get("colorrule3minvalue");
        var colorrule3maxvalue = this.AttrMap.get("colorrule3maxvalue");
        var colorrule3color = this.AttrMap.get("colorrule3color");

        var colorrule3minvalue = this.AttrMap.get("colorrule3minvalue");
        var colorrule3maxvalue = this.AttrMap.get("colorrule3maxvalue");
        var colorrule3color = this.AttrMap.get("colorrule3color");

        this.datapoint.select(datapoint);
        this.textcolor.setColor(color);
        this.backgroundcolor.setColor(backcolor);
        this.minvalue.setText(minvalue);
        this.maxvalue.setText(maxvalue);
        this.showvalue.setCheck(showvalue);

        this.colorrule1.setMinvalue(colorrule1minvalue);
        this.colorrule1.setMaxvalue(colorrule1maxvalue);
        this.colorrule1.setColor(colorrule1color);

        this.colorrule2.setMinvalue(colorrule2minvalue);
        this.colorrule2.setMaxvalue(colorrule2maxvalue);
        this.colorrule2.setColor(colorrule2color);

        this.colorrule3.setMinvalue(colorrule3minvalue);
        this.colorrule3.setMaxvalue(colorrule3maxvalue);
        this.colorrule3.setColor(colorrule3color);
    }

    updateInfoToSvg() {
        $(this.targetgroup).find("text[class=minvalue]").html(this.AttrMap.get("minvalue"));
        $(this.targetgroup).find("text[class=maxvalue]").html(this.AttrMap.get("maxvalue"));
        $(this.targetgroup).find("text[class=text]").attr("fill", this.AttrMap.get("color"));
        $(this.targetgroup).find("rect[class=back]").attr("fill", this.AttrMap.get("backcolor"));

        if (this.AttrMap.get("showvalue") === "true") {
            $(this.targetgroup).find("text[class=text]").css("display", "block");
        } else {
            $(this.targetgroup).find("text[class=text]").css("display", "none");
        }
    }

    setDatapoint(classtype, value) {
        if (classtype instanceof Datapoint) {
            this.AttrMap.set("datapoint", value);
        }
        this.updateInfoToDataAttribute();
    }

    setColor(classtype, value) {
        if (classtype instanceof Textcolor) {
            this.AttrMap.set("color", value);
        } else if (classtype instanceof Backgroundcolor) {
            this.AttrMap.set("backcolor", value);
        } else if (classtype instanceof ColorRule1) {
            this.AttrMap.set("colorrule1color", value);
        } else if (classtype instanceof ColorRule2) {
            this.AttrMap.set("colorrule2color", value);
        } else if (classtype instanceof ColorRule3) {
            this.AttrMap.set("colorrule3color", value);
        }


        this.updateInfoToDataAttribute();
        this.updateInfoToSvg()
    }

    setText(classtype, str) {
        if (classtype instanceof MinValue) {
            this.AttrMap.set("minvalue", str);
        } else if (classtype instanceof MaxValue) {
            this.AttrMap.set("maxvalue", str);
        }
        this.updateInfoToDataAttribute();
        this.updateInfoToSvg();
    }

    setMinValue(classtype, value) {
        if (classtype instanceof ColorRule1) {
            this.AttrMap.set("colorrule1minvalue", value);
        } else if (classtype instanceof ColorRule2) {
            this.AttrMap.set("colorrule2minvalue", value);
        } else if (classtype instanceof ColorRule3) {
            this.AttrMap.set("colorrule3minvalue", value);
        }
        this.updateInfoToDataAttribute();
    }

    setMaxValue(classtype, value) {
        if (classtype instanceof ColorRule1) {
            this.AttrMap.set("colorrule1maxvalue", value);
        } else if (classtype instanceof ColorRule2) {
            this.AttrMap.set("colorrule2maxvalue", value);
        } else if (classtype instanceof ColorRule3) {
            this.AttrMap.set("colorrule3maxvalue", value);
        }

        this.updateInfoToDataAttribute();
    }

    setCheck(flag) {
        flag += "";
        this.AttrMap.set("showvalue", flag);
        this.updateInfoToDataAttribute();
        this.updateInfoToSvg();
    }


}

class GaugeManager extends Manager {
    nameKey = "gauge";

    constructor(_root) {
        super();

        if (_root && this.nameKey) {
            _root.managerarray.set(this.nameKey, this);
        }

        this.setTitle("Gauge");
        this.setSize(400, 230);
        this.setPosition(600, 480);

        this.datapoint = new Datapoint(this, this.maindiv);
        this.title = new Title(this, this.maindiv);
        this.colorrule1 = new ColorRule1(this, this.maindiv);
        this.colorrule2 = new ColorRule2(this, this.maindiv);
        this.colorrule3 = new ColorRule3(this, this.maindiv);
        this.minvalue = new MinValue(this, this.maindiv);
        this.maxvalue = new MaxValue(this, this.maindiv);
    }

    updateInfoToWidget() {
        var datapoint = this.AttrMap.get("datapoint");
        var title = this.AttrMap.get("title");
        var minvalue = this.AttrMap.get("minvalue");
        var maxvalue = this.AttrMap.get("maxvalue");

        var colorrule1minvalue = this.AttrMap.get("colorrule1minvalue");
        var colorrule1maxvalue = this.AttrMap.get("colorrule1maxvalue");
        var colorrule1color = this.AttrMap.get("colorrule1color");

        var colorrule2minvalue = this.AttrMap.get("colorrule2minvalue");
        var colorrule2maxvalue = this.AttrMap.get("colorrule2maxvalue");
        var colorrule2color = this.AttrMap.get("colorrule2color");

        var colorrule3minvalue = this.AttrMap.get("colorrule3minvalue");
        var colorrule3maxvalue = this.AttrMap.get("colorrule3maxvalue");
        var colorrule3color = this.AttrMap.get("colorrule3color");

        var colorrule3minvalue = this.AttrMap.get("colorrule3minvalue");
        var colorrule3maxvalue = this.AttrMap.get("colorrule3maxvalue");
        var colorrule3color = this.AttrMap.get("colorrule3color");

        this.datapoint.select(datapoint);
        this.title.setText(title);
        this.minvalue.setText(minvalue);
        this.maxvalue.setText(maxvalue);

        this.colorrule1.setMinvalue(colorrule1minvalue);
        this.colorrule1.setMaxvalue(colorrule1maxvalue);
        this.colorrule1.setColor(colorrule1color);

        this.colorrule2.setMinvalue(colorrule2minvalue);
        this.colorrule2.setMaxvalue(colorrule2maxvalue);
        this.colorrule2.setColor(colorrule2color);

        this.colorrule3.setMinvalue(colorrule3minvalue);
        this.colorrule3.setMaxvalue(colorrule3maxvalue);
        this.colorrule3.setColor(colorrule3color);
    }

    updateInfoToSvg() {
        $(this.targetgroup).find("text[class=minvalue]").html(this.AttrMap.get("minvalue"));
        $(this.targetgroup).find("text[class=maxvalue]").html(this.AttrMap.get("maxvalue"));
        $(this.targetgroup).find("text[class=title]").html(this.AttrMap.get("title"));
    }

    setDatapoint(classtype, value) {
        if (classtype instanceof Datapoint) {
            this.AttrMap.set("datapoint", value);
        }
        this.updateInfoToDataAttribute();
    }

    setText(classtype, str) {
        if (classtype instanceof MinValue) {
            this.AttrMap.set("minvalue", str);
        } else if (classtype instanceof MaxValue) {
            this.AttrMap.set("maxvalue", str);
        } else if (classtype instanceof Title) {
            this.AttrMap.set("title", str);
        }
        this.updateInfoToDataAttribute();
        this.updateInfoToSvg();
    }

    setMinValue(classtype, value) {
        if (classtype instanceof ColorRule1) {
            this.AttrMap.set("colorrule1minvalue", value);
        } else if (classtype instanceof ColorRule2) {
            this.AttrMap.set("colorrule2minvalue", value);
        } else if (classtype instanceof ColorRule3) {
            this.AttrMap.set("colorrule3minvalue", value);
        }
        this.updateInfoToDataAttribute();
    }

    setMaxValue(classtype, value) {
        if (classtype instanceof ColorRule1) {
            this.AttrMap.set("colorrule1maxvalue", value);
        } else if (classtype instanceof ColorRule2) {
            this.AttrMap.set("colorrule2maxvalue", value);
        } else if (classtype instanceof ColorRule3) {
            this.AttrMap.set("colorrule3maxvalue", value);
        }

        this.updateInfoToDataAttribute();
    }

    setColor(classtype, value) {
        if (classtype instanceof ColorRule1) {
            this.AttrMap.set("colorrule1color", value);
        } else if (classtype instanceof ColorRule2) {
            this.AttrMap.set("colorrule2color", value);
        } else if (classtype instanceof ColorRule3) {
            this.AttrMap.set("colorrule3color", value);
        }

        this.updateInfoToDataAttribute();
    }
}

class GraphicManager extends Manager {
    nameKey = "graphic";

    constructor(_root) {
        super();

        if (_root && this.nameKey) {
            _root.managerarray.set(this.nameKey, this);
        }

        this.setTitle("Grafic");
        this.setSize(350, 240);
        this.setPosition(600, 100);

        this.datapoint = new Datapoint(this, this.maindiv);
        $(this.datapoint.namediv).html("Datapoint1");
        // this.colorruleoff = new ColorRuleOff(this, this.maindiv);
        // this.colorruleon = new ColorRuleOn(this, this.maindiv);

        this.colorrule1 = new ColorRule1(this, this.maindiv);
        this.colorrule2 = new ColorRule2(this, this.maindiv);
        this.colorrule3 = new ColorRule3(this, this.maindiv);

        this.datapoint1 = new Datapoint1(this, this.maindiv);
        $(this.datapoint1.namediv).html("Datapoint2");
        this.blinkcolorrule = new BlinkColorRule(this, this.maindiv);

        this.action = new Action(this, this.maindiv);
    }

    updateInfoToWidget() {
        var datapoint = this.AttrMap.get("datapoint");
        var datapoint1 = this.AttrMap.get("datapoint1");
        var action = this.AttrMap.get("action");

        var colorrule1minvalue = this.AttrMap.get("colorrule1minvalue");
        var colorrule1maxvalue = this.AttrMap.get("colorrule1maxvalue");
        var colorrule1color = this.AttrMap.get("colorrule1color");

        var colorrule2minvalue = this.AttrMap.get("colorrule2minvalue");
        var colorrule2maxvalue = this.AttrMap.get("colorrule2maxvalue");
        var colorrule2color = this.AttrMap.get("colorrule2color");

        var colorrule3minvalue = this.AttrMap.get("colorrule3minvalue");
        var colorrule3maxvalue = this.AttrMap.get("colorrule3maxvalue");
        var colorrule3color = this.AttrMap.get("colorrule3color");

        var colorrule3minvalue = this.AttrMap.get("colorrule3minvalue");
        var colorrule3maxvalue = this.AttrMap.get("colorrule3maxvalue");
        var colorrule3color = this.AttrMap.get("colorrule3color");

        var blinkcolorruleminvalue = this.AttrMap.get("blinkcolorruleminvalue");
        var blinkcolorrulemaxvalue = this.AttrMap.get("blinkcolorrulemaxvalue");
        var blinkcolorrulecolor = this.AttrMap.get("blinkcolorrulecolor");

        this.datapoint.select(datapoint);
        this.datapoint1.select(datapoint1);
        this.action.setText(action);

        this.colorrule1.setMinvalue(colorrule1minvalue);
        this.colorrule1.setMaxvalue(colorrule1maxvalue);
        this.colorrule1.setColor(colorrule1color);

        this.colorrule2.setMinvalue(colorrule2minvalue);
        this.colorrule2.setMaxvalue(colorrule2maxvalue);
        this.colorrule2.setColor(colorrule2color);

        this.colorrule3.setMinvalue(colorrule3minvalue);
        this.colorrule3.setMaxvalue(colorrule3maxvalue);
        this.colorrule3.setColor(colorrule3color);

        this.blinkcolorrule.setMinvalue(blinkcolorruleminvalue);
        this.blinkcolorrule.setMaxvalue(blinkcolorrulemaxvalue);
        this.blinkcolorrule.setColor(blinkcolorrulecolor);
    }

    setDatapoint(classtype, value) {
        if (classtype instanceof Datapoint) {
            this.AttrMap.set("datapoint", value);
        } else if (classtype instanceof Datapoint1) {
            this.AttrMap.set("datapoint1", value);
        }

        this.updateInfoToDataAttribute();
    }

    setText(classtype, str) {
        if (classtype instanceof Action) {
            this.AttrMap.set("action", str);

            var datapoint = this.AttrMap.get("datapoint");
            // classtype.execute(datapoint, str);
        }
        this.updateInfoToDataAttribute();
    }

    setMinValue(classtype, value) {
        if (classtype instanceof ColorRule1) {
            this.AttrMap.set("colorrule1minvalue", value);
        } else if (classtype instanceof ColorRule2) {
            this.AttrMap.set("colorrule2minvalue", value);
        } else if (classtype instanceof ColorRule3) {
            this.AttrMap.set("colorrule3minvalue", value);
        } else if (classtype instanceof BlinkColorRule) {
            this.AttrMap.set("blinkcolorruleminvalue", value);
        }

        this.updateInfoToDataAttribute();
    }

    setMaxValue(classtype, value) {
        if (classtype instanceof ColorRule1) {
            this.AttrMap.set("colorrule1maxvalue", value);
        } else if (classtype instanceof ColorRule2) {
            this.AttrMap.set("colorrule2maxvalue", value);
        } else if (classtype instanceof ColorRule3) {
            this.AttrMap.set("colorrule3maxvalue", value);
        } else if (classtype instanceof BlinkColorRule) {
            this.AttrMap.set("blinkcolorrulemaxvalue", value);
        }

        this.updateInfoToDataAttribute();
    }

    setColor(classtype, value) {
        if (classtype instanceof ColorRule1) {
            this.AttrMap.set("colorrule1color", value);
        } else if (classtype instanceof ColorRule2) {
            this.AttrMap.set("colorrule2color", value);
        } else if (classtype instanceof ColorRule3) {
            this.AttrMap.set("colorrule3color", value);
        } else if (classtype instanceof BlinkColorRule) {
            this.AttrMap.set("blinkcolorrulecolor", value);
        }

        this.updateInfoToDataAttribute();
    }
}

class TableManager extends Manager {
    nameKey = "table";

    constructor(_root) {
        super();

        if (_root && this.nameKey) {
            _root.managerarray.set(this.nameKey, this);
        }

        this.setTitle("Table");
        this.setSize(350, 200);
        this.setPosition(600, 100);

        this.row = new Row(this, this.maindiv);
        this.col = new Col(this, this.maindiv);
        this.width = new Width(this, this.maindiv);
        this.height = new Height(this, this.maindiv);
        this.border = new Border(this, this.maindiv);
        this.margin = new Margin(this, this.maindiv);
    }

    updateInfoToWidget() {
        var row = this.AttrMap.get("row");
        var col = this.AttrMap.get("col");
        var width = this.AttrMap.get("width");
        var height = this.AttrMap.get("height");
        var border = this.AttrMap.get("border");
        var margin = this.AttrMap.get("margin");

        this.row.setText(row);
        this.col.setText(col);
        this.width.setText(width);
        this.height.setText(height);
        this.border.setText(border);
        this.margin.setText(margin);
    }

    updateInfoToSvg() {
        var margin = parseFloat(this.AttrMap.get("margin"));
        var row = parseFloat(this.AttrMap.get("row"));
        var col = parseFloat(this.AttrMap.get("col"));
        var width = parseFloat(this.AttrMap.get("width"));
        var height = parseFloat(this.AttrMap.get("height"));
        var border = parseFloat(this.AttrMap.get("border"));

        var orgBorder = $(this.targetgroup).find("rect[class=border]")[0];

        var x = parseFloat($(orgBorder).attr("x"));
        var y = parseFloat($(orgBorder).attr("y"));

        var borderWidth = (col * width) + ((col + 1) * margin);
        var borderHeight = (row * height) + ((row + 1) * margin);

        var borderWidget = CreateSVG("rect", { x: x, y: y, class: "border", width: borderWidth, height: borderHeight, "stroke-width": border, stroke: "#000000", fill: "transparent" });

        $(this.targetgroup).html("");
        $(this.targetgroup).append(borderWidget);

        for (var i = 0; i < row; ++i) {
            for (var j = 0; j < col; ++j) {
                var rect = CreateSVG("rect", { x: x + (j + 1) * margin + (j * width), y: y + (i + 1) * margin + (i * height), width: width, height: height, "stroke-width": border, stroke: "#000000", fill: "transparent" });
                $(this.targetgroup).append(rect);
            }
        }
    }

    setText(classtype, str) {
        if (classtype instanceof Row) {
            this.AttrMap.set("row", str);
        } else if (classtype instanceof Col) {
            this.AttrMap.set("col", str);
        } else if (classtype instanceof Width) {
            this.AttrMap.set("width", str);
        } else if (classtype instanceof Height) {
            this.AttrMap.set("height", str);
        } else if (classtype instanceof Border) {
            this.AttrMap.set("border", str);
        } else if (classtype instanceof Margin) {
            this.AttrMap.set("margin", str);
        }
        this.updateInfoToDataAttribute();
        this.updateInfoToSvg();
    }
}

class ImgManager extends Manager {
    nameKey = "image";

    constructor(_root) {
        super();

        if (_root && this.nameKey) {
            _root.managerarray.set(this.nameKey, this);
        }

        this.setTitle("Image");
        this.setSize(350, 325);
        this.setPosition(100, 100);

        this.datapoint = new Datapoint(this, this.maindiv);
        $(this.datapoint.namediv).html("DP1 Off/On");
        this.datapoint1 = new Datapoint1(this, this.maindiv);
        $(this.datapoint1.namediv).html("DP2 Malfunction");
        this.datapoint2 = new Datapoint2(this, this.maindiv);
        $(this.datapoint2.namediv).html("DP3 Maintenance");
        this.dp1e0 = new BildDP1E0(this, this.maindiv);
        this.dp1e1 = new BildDP1E1(this, this.maindiv);
        this.dp2e1 = new BildDP2E1(this, this.maindiv);
        this.dp3e1 = new BildDP3E1(this, this.maindiv);
        this.descriptiondp1e1 = new DescriptionDP1E1(this, this.maindiv);
        this.descriptiondp1e0 = new DescriptionDP1E0(this, this.maindiv);
        this.action = new Action(this, this.maindiv);
    }

    updateInfoToWidget() {
        if (this.AttrMap) {
            var datapoint = this.AttrMap.get("datapoint");
            var datapoint1 = this.AttrMap.get("datapoint1");
            var datapoint2 = this.AttrMap.get("datapoint2");
            var dp1e0 = this.AttrMap.get("dp1e0");
            var dp1e1 = this.AttrMap.get("dp1e1");
            var dp2e1 = this.AttrMap.get("dp2e1");
            var dp3e1 = this.AttrMap.get("dp3e1");
            var descriptiondp1e1 = this.AttrMap.get("descriptiondp1e1");
            var descriptiondp1e0 = this.AttrMap.get("descriptiondp1e0");
            var action = this.AttrMap.get("action");

            this.datapoint.select(datapoint);
            this.datapoint1.select(datapoint1);
            this.datapoint2.select(datapoint2);

            this.dp1e0.select(dp1e0);
            this.dp1e1.select(dp1e1);
            this.dp2e1.select(dp2e1);
            this.dp3e1.select(dp3e1);

            this.descriptiondp1e1.setText(descriptiondp1e1);
            this.descriptiondp1e0.setText(descriptiondp1e0);
            this.action.setText(action);
        } else {
            this.AttrMap = new Map();

            this.datapoint.select("null");
            this.datapoint1.select("null");
            this.datapoint2.select("null");

            this.dp1e0.select("null");
            this.dp1e1.select("null");
            this.dp2e1.select("null");
            this.dp3e1.select("null");

            this.descriptiondp1e1.setText("");
            this.descriptiondp1e0.setText("");
            this.action.setText("");

        }
    }

    updateInfoToSvg() {
        // console.log("updateInfoToSvg");
        // $(this.targetgroup).find("text").attr("fill", this.AttrMap.get("color"));
        // $(this.targetgroup).find("rect").attr("fill", this.AttrMap.get("backcolor"));
    }

    setDatapoint(classtype, value) {
        if (classtype instanceof Datapoint) {
            this.AttrMap.set("datapoint", value);
        } else if (classtype instanceof Datapoint1) {
            this.AttrMap.set("datapoint1", value);
        } else if (classtype instanceof Datapoint2) {
            this.AttrMap.set("datapoint2", value);
        }
        this.updateInfoToDataAttribute();
    }

    setImage(classtype, value) {
        if (classtype instanceof BildDP1E0) {
            this.AttrMap.set("dp1e0", value);
        } else if (classtype instanceof BildDP1E1) {
            this.AttrMap.set("dp1e1", value);
        } else if (classtype instanceof BildDP2E1) {
            this.AttrMap.set("dp2e1", value);
        } else if (classtype instanceof BildDP3E1) {
            this.AttrMap.set("dp3e1", value);
        }
        this.updateInfoToDataAttribute();
    }

    setText(classtype, str) {
        if (classtype instanceof Action) {
            this.AttrMap.set("action", str);
        } else if (classtype instanceof DescriptionDP1E1) {
            this.AttrMap.set("descriptiondp1e1", str);
        } else if (classtype instanceof DescriptionDP1E0) {
            this.AttrMap.set("descriptiondp1e0", str);
        }

        this.updateInfoToDataAttribute();
    }
}

class Root {
    dataAttribute = "class";
    tooltip = null;
    terminalgroup = null;
    bShowContextMenu = false;

    blinkcount = 0;
    flowcount = 0;

    managerarray = new Map();

    constructor() {
        this.updateRoutine();
        this.addPatchedMouseEventListener();

        setTimeout(() => {
            this.terminalgroup = $($("#svgcontent")[0]).children("g")[1];
            this.tooltip = $(this.terminalgroup).find("title")[0];
            $("div[data-cat=library]").trigger("mouseup");
            G_Data.Read_DataPoint_List(this.updateAll_IO_Names);
        }, 200);
    }

    getValueFromDatabase(datapoint) {
        return G_Data.getValueFromDatabase(datapoint);
    }

    showTheManager(ctype, x, y, targetgroup) {
        if (ctype === "hbar" || ctype === "vbar") {
            ctype = "bar";
        }
        var manager = this.managerarray.get(ctype);

        if (manager) {
            manager.show(x, y, targetgroup, this);
        }
    }

    updateRoutine() {
        ++this.blinkcount;
        ++this.flowcount;
        this.flowcount = (this.flowcount % 100);

        G_Data.Read_DataPoint_Value();

        var svgcontent = $("#svgcontent")[0];

        if (svgcontent && !G_loadingWidget.loading) {
            var that = this;
            $(svgcontent).find("g[class]").each(function () {
                var AttrMap = that.parseDataAttribute($(this).attr(that.dataAttribute));
                var ctype = AttrMap.get("ctype");
                switch (ctype) {
                    case "data":
                        that.processData(this);
                        break
                    case "text":
                        that.processText(this);
                        break
                    case "hbar":
                    case "vbar":
                        that.processBar(this);
                        break
                    case "gauge":
                        that.processGauge(this);
                        break
                    case "graphic":
                        that.processGraphic(this);
                        break
                }
            });
            $(svgcontent).find("image[class]").each(async function () {
                var AttrMap = that.parseDataAttribute($(this).attr(that.dataAttribute));
                if (AttrMap) {
                    var datapoint = AttrMap.get("datapoint");
                    var datapoint1 = AttrMap.get("datapoint1");
                    var datapoint2 = AttrMap.get("datapoint2");
                    var dp1e0 = AttrMap.get("dp1e0");
                    var dp1e1 = AttrMap.get("dp1e1");
                    var dp2e1 = AttrMap.get("dp2e1");
                    var dp3e1 = AttrMap.get("dp3e1");
                    var descriptiondp1e1 = AttrMap.get("descriptiondp1e1");
                    var descriptiondp1e0 = AttrMap.get("descriptiondp1e0");
                    var action = AttrMap.get("action");

                    if (dp3e1 && datapoint2) {
                        var val = parseInt(that.getValueFromDatabase(datapoint2));
                        if (val === 1) {
                            var imgtag = this;
                            var reader = new FileReader();
                            reader.onloadend = function (e) {
                                var img = new Image()
                                img.src = e.target.result
                                img.onload = function () {
                                    $(imgtag).attr("xlink:href", e.target.result);
                                }
                            };

                            var imgListObj = G_Image.AllImageListMap.get(dp3e1);
                            if (imgListObj) {
                                var imgreadpath = imgListObj.prepath + imgListObj.name;

                                var data = await G_NetWork.ReadFileAsBlob(imgreadpath);
                                // reader.readAsDataURL(G_Image.AllImageMap.get(dp3e1).data);
                                reader.readAsDataURL(data);
                            }
                            return;
                        }
                    }

                    if (dp2e1 && datapoint1) {
                        var val = parseInt(that.getValueFromDatabase(datapoint1));
                        if (val > 0) {
                            var imgtag = this;
                            var reader = new FileReader();
                            reader.onloadend = function (e) {
                                var img = new Image()
                                img.src = e.target.result
                                img.onload = function () {
                                    $(imgtag).attr("xlink:href", e.target.result);
                                }
                            };

                            var imgListObj = G_Image.AllImageListMap.get(dp2e1);
                            if (imgListObj) {
                                var imgreadpath = imgListObj.prepath + imgListObj.name;

                                var data = await G_NetWork.ReadFileAsBlob(imgreadpath);
                                // reader.readAsDataURL(G_Image.AllImageMap.get(dp2e1).data);
                                reader.readAsDataURL(data);
                            }
                            return;
                        }
                    }

                    if (dp1e1 && datapoint) {
                        var val = parseInt(that.getValueFromDatabase(datapoint));
                        if (val === 1) {
                            var imgtag = this;
                            var reader = new FileReader();
                            reader.onloadend = function (e) {
                                var img = new Image()
                                img.src = e.target.result
                                img.onload = function () {
                                    $(imgtag).attr("xlink:href", e.target.result);
                                }
                            };

                            var imgListObj = G_Image.AllImageListMap.get(dp1e1);
                            if (imgListObj) {
                                var imgreadpath = imgListObj.prepath + imgListObj.name;

                                var data = await G_NetWork.ReadFileAsBlob(imgreadpath);
                                // reader.readAsDataURL(G_Image.AllImageMap.get(dp1e1).data);
                                reader.readAsDataURL(data);
                            }
                            return;
                        }
                    }

                    if (dp1e0 && datapoint) {
                        var val = parseInt(that.getValueFromDatabase(datapoint));
                        if (val === 0) {
                            var imgtag = this;
                            var reader = new FileReader();
                            reader.onloadend = function (e) {
                                var img = new Image()
                                img.src = e.target.result
                                img.onload = function () {
                                    $(imgtag).attr("xlink:href", e.target.result);
                                }
                            };
                            var imgListObj = G_Image.AllImageListMap.get(dp1e0);
                            if (imgListObj) {
                                var imgreadpath = imgListObj.prepath + imgListObj.name;

                                var data = await G_NetWork.ReadFileAsBlob(imgreadpath);
                                // reader.readAsDataURL(G_Image.AllImageMap.get(dp1e0).data);
                                reader.readAsDataURL(data);
                            }
                            return;
                        }
                    }
                }
            });
        }

        setTimeout(() => {
            this.updateRoutine();
        }, 1000);
    }

    processData(group) {
        var AttrMap = this.parseDataAttribute($(group).attr(this.dataAttribute));
        var datapoint = AttrMap.get("datapoint");
        var val = this.getValueFromDatabase(datapoint);

        var text = $(group).find("text")[0];
        var back = $(group).find("rect")[0];

        $(text).html(val);

        var bbox = text.getBBox();

        var transformStr = $(text).attr("transform");
        if (transformStr) {
            $(back).attr("transform", transformStr);
        }

        var x = parseFloat($(text).attr("x"));
        var y = parseFloat($(text).attr("y")) - bbox.height + bbox.height / 100 * 15;
        $(back).attr("x", x);
        $(back).attr("y", y);
        $(back).attr("width", bbox.width);
        $(back).attr("height", bbox.height);

    }

    processText(group) {
        var AttrMap = this.parseDataAttribute($(group).attr(this.dataAttribute));
        var datapoint = AttrMap.get("datapoint");

        var val = parseFloat(this.getValueFromDatabase(datapoint));

        var text = $(group).find("text")[0];
        var back = $(group).find("rect")[0];

        var contentrule1minvalue = AttrMap.get("contentrule1minvalue");
        var contentrule1maxvalue = AttrMap.get("contentrule1maxvalue");
        var contentrule1content = AttrMap.get("contentrule1content");

        var contentrule2minvalue = AttrMap.get("contentrule2minvalue");
        var contentrule2maxvalue = AttrMap.get("contentrule2maxvalue");
        var contentrule2content = AttrMap.get("contentrule2content");

        var contentrule3minvalue = AttrMap.get("contentrule3minvalue");
        var contentrule3maxvalue = AttrMap.get("contentrule3maxvalue");
        var contentrule3content = AttrMap.get("contentrule3content");

        var blinkcontentruleminvalue = AttrMap.get("blinkcontentruleminvalue");
        var blinkcontentrulemaxvalue = AttrMap.get("blinkcontentrulemaxvalue");
        var blinkcontentrulecontent = AttrMap.get("blinkcontentrulecontent");

        $(text).css("display", "block");

        if (val >= contentrule1minvalue && val <= contentrule1maxvalue) {
            $(text).html(contentrule1content);
        }

        if (val >= contentrule2minvalue && val <= contentrule2maxvalue) {
            $(text).html(contentrule2content);
        }

        if (val >= contentrule3minvalue && val <= contentrule3maxvalue) {
            $(text).html(contentrule3content);
        }

        if (val >= blinkcontentruleminvalue && val <= blinkcontentrulemaxvalue) {
            $(text).html(blinkcontentrulecontent);
            if (this.blinkcount % 2 === 0) {
                // $(text).css("display","block");
            } else {
                $(text).css("display", "none");
            }
        }

        var bbox = text.getBBox();

        var transformStr = $(text).attr("transform");
        if (transformStr) {
            $(back).attr("transform", transformStr);
        }

        var x = parseFloat($(text).attr("x"));
        var y = parseFloat($(text).attr("y")) - bbox.height + bbox.height / 100 * 15;
        $(back).attr("x", x);
        $(back).attr("y", y);
        $(back).attr("width", bbox.width);
        $(back).attr("height", bbox.height);

    }

    processBar(group) {
        var AttrMap = this.parseDataAttribute($(group).attr(this.dataAttribute));
        var ctype = AttrMap.get("ctype");
        var datapoint = AttrMap.get("datapoint");
        var minvalue = AttrMap.get("minvalue");
        var maxvalue = AttrMap.get("maxvalue");
        var val = this.getValueFromDatabase(datapoint);
        if ("Null" === val) {
            return;
        }
        var percent = (parseFloat(val) - parseFloat(minvalue)) / (parseFloat(maxvalue) - parseFloat(minvalue));

        if (percent < 0 || percent > 1) {
            return;
        }

        var text = $(group).find("text[class=text]")[0];
        var mintext = $(group).find("text[class=minvalue]")[0];
        var maxtext = $(group).find("text[class=maxvalue]")[0];
        var bar = $(group).find("rect[class=bar]")[0];
        var back = $(group).find("rect[class=back]")[0];

        var colorrule1minvalue = AttrMap.get("colorrule1minvalue");
        var colorrule1maxvalue = AttrMap.get("colorrule1maxvalue");
        var colorrule1color = AttrMap.get("colorrule1color");

        var colorrule2minvalue = AttrMap.get("colorrule2minvalue");
        var colorrule2maxvalue = AttrMap.get("colorrule2maxvalue");
        var colorrule2color = AttrMap.get("colorrule2color");

        var colorrule3minvalue = AttrMap.get("colorrule3minvalue");
        var colorrule3maxvalue = AttrMap.get("colorrule3maxvalue");
        var colorrule3color = AttrMap.get("colorrule3color");

        if (val >= colorrule1minvalue && val <= colorrule1maxvalue) {
            $(group).find(".bar").attr("fill", colorrule1color);
        }

        if (val >= colorrule2minvalue && val <= colorrule2maxvalue) {
            $(group).find(".bar").attr("fill", colorrule2color);
        }

        if (val >= colorrule3minvalue && val <= colorrule3maxvalue) {
            $(group).find(".bar").attr("fill", colorrule3color);
        }

        $(text).html(val);

        switch (ctype) {
            case "hbar":
                $(bar).attr("width", parseFloat($(back).attr("width")) * percent);

                var transformStr = $(text).attr("transform");

                var widthscale = 1.0;
                if (transformStr) {
                    var matrix = transformStr.parseTransform("matrix");
                    widthscale = matrix.matrix.a;
                }

                $(text).attr("x", parseFloat($(mintext).attr("x")) + parseFloat($(bar).attr("width")) / widthscale + (parseFloat($(back).attr("width")) / widthscale / 100));

                break;
            case "vbar":
                $(bar).attr("y", parseFloat($(back).attr("y")) + parseFloat($(back).attr("height")) * (1 - percent));
                $(bar).attr("height", parseFloat($(back).attr("height")) * percent);


                var transformStr = $(text).attr("transform");

                var heightscale = 1.0;
                if (transformStr) {
                    var matrix = transformStr.parseTransform("matrix");
                    heightscale = matrix.matrix.d;
                }

                $(text).attr("y", parseFloat($(mintext).attr("y")) - parseFloat($(bar).attr("height")) / heightscale);
                break;
        }
    }

    processGauge(group) {
        var AttrMap = this.parseDataAttribute($(group).attr(this.dataAttribute));

        var datapoint = AttrMap.get("datapoint");
        var minvalue = AttrMap.get("minvalue");
        var maxvalue = AttrMap.get("maxvalue");
        var val = this.getValueFromDatabase(datapoint);
        if ("Null" === val) {
            return;
        }
        var percent = (parseFloat(val) - parseFloat(minvalue)) / (parseFloat(maxvalue) - parseFloat(minvalue));

        if (percent < 0 || percent > 1) {
            return;
        }

        var text = $(group).find("text[class=text]")[0];
        var back = $(group).find("path[class=back]")[0];
        var path = $(group).find("path[class=path]")[0];
        var pointer = $(group).find("polygon[class=pointer]")[0];


        if (percent <= 1) {
            // R = 250
            // T = 62.5     (1/4)
            // r = 187.5
            // 1280 - 500 = 780 /2 = 390
            // 960

            // PT = 7.8125 (1/32)
            // PL = 312.5 (5/4)

            // l1 = (390,500)
            // l1 = (890,500)

            // o = (640,500)
            // var org = { x: 640, y: 500 };
            var org = { x: 0, y: 0 };

            var str = $(back).attr("d");
            str = str.split(",");

            var leftx = parseFloat(str[2].split(" ")[4]);
            var rightx = parseFloat(str[0].replace("M", ""));

            var R = (rightx - leftx) / 2;
            var t = R / 4;
            var r = R - t;
            var pR = R * 5 / 4;

            org.y = parseFloat(str[1].split("A")[0]);
            org.x = (leftx + rightx) / 2;

            var rad = percent * 180 * (Math.PI / 180);

            var Rx = org.x - Math.cos(rad) * R;
            var Ry = org.y - Math.sin(rad) * R;


            var rx = org.x - Math.cos(rad) * r;
            var ry = org.y - Math.sin(rad) * r;

            var Rpx = org.x - Math.cos(rad) * pR;
            var Rpy = org.y - Math.sin(rad) * pR;

            var rrxl = org.x - Math.sin(rad) * t / 10;
            var rryl = org.y + Math.cos(rad) * t / 10;

            var rrxr = org.x + Math.sin(rad) * t / 10;
            var rryr = org.y - Math.cos(rad) * t / 10;

            $(path).attr("d", 'M ' + Rx + ', ' + Ry + ' A' + R + ',' + R + ' 0 0 0 ' + leftx + ',' + org.y + ' h' + t + ' A' + r + ',' + r + ' 0 0 1 ' + rx + ',' + ry + ' z');
            $(pointer).attr("points", '' + Rpx + ',' + Rpy + ' ' + rrxl + ',' + rryl + ' ' + rrxr + ',' + rryr + '');
        }

        var colorrule1minvalue = AttrMap.get("colorrule1minvalue");
        var colorrule1maxvalue = AttrMap.get("colorrule1maxvalue");
        var colorrule1color = AttrMap.get("colorrule1color");

        var colorrule2minvalue = AttrMap.get("colorrule2minvalue");
        var colorrule2maxvalue = AttrMap.get("colorrule2maxvalue");
        var colorrule2color = AttrMap.get("colorrule2color");

        var colorrule3minvalue = AttrMap.get("colorrule3minvalue");
        var colorrule3maxvalue = AttrMap.get("colorrule3maxvalue");
        var colorrule3color = AttrMap.get("colorrule3color");

        if (val >= colorrule1minvalue && val <= colorrule1maxvalue) {
            $(group).find(".path").attr("fill", colorrule1color);
        }

        if (val >= colorrule2minvalue && val <= colorrule2maxvalue) {
            $(group).find(".path").attr("fill", colorrule2color);
        }

        if (val >= colorrule3minvalue && val <= colorrule3maxvalue) {
            $(group).find(".path").attr("fill", colorrule3color);
        }

        $(text).html(val);
    }

    tryProcessFlow(group) {
        var rect = $(group).find("rect[class=track]")[0];
        var flow = $(group).find(".color")[0];

        if (rect && flow) {
            var x = parseFloat($(rect).attr("x"));
            var w = parseFloat($(rect).attr("width"));
            var percent = this.flowcount / 100;
            var transX = percent * w;
            // console.log(this.flowcount,"|",percent,"|",transX);
            $(flow).attr("transform", "translate(" + transX + ",0)");
        }
    }

    processGraphic(group) {
        var AttrMap = this.parseDataAttribute($(group).attr(this.dataAttribute));
        var datapoint = AttrMap.get("datapoint");
        var datapoint1 = AttrMap.get("datapoint1");

        var val = parseFloat(this.getValueFromDatabase(datapoint));
        var val1 = parseFloat(this.getValueFromDatabase(datapoint1));

        var colorrule1minvalue = AttrMap.get("colorrule1minvalue");
        var colorrule1maxvalue = AttrMap.get("colorrule1maxvalue");
        var colorrule1color = AttrMap.get("colorrule1color");

        var colorrule2minvalue = AttrMap.get("colorrule2minvalue");
        var colorrule2maxvalue = AttrMap.get("colorrule2maxvalue");
        var colorrule2color = AttrMap.get("colorrule2color");

        var colorrule3minvalue = AttrMap.get("colorrule3minvalue");
        var colorrule3maxvalue = AttrMap.get("colorrule3maxvalue");
        var colorrule3color = AttrMap.get("colorrule3color");

        var blinkcolorruleminvalue = AttrMap.get("blinkcolorruleminvalue");
        var blinkcolorrulemaxvalue = AttrMap.get("blinkcolorrulemaxvalue");
        var blinkcolorrulecolor = AttrMap.get("blinkcolorrulecolor");


        if (val >= colorrule1minvalue && val <= colorrule1maxvalue) {
            $(group).find(".color").attr("fill", colorrule1color);
        }

        if (val >= colorrule2minvalue && val <= colorrule2maxvalue) {
            $(group).find(".color").attr("fill", colorrule2color);
        }

        if (val >= colorrule3minvalue && val <= colorrule3maxvalue) {
            $(group).find(".color").attr("fill", colorrule3color);
        }

        if (val1 >= blinkcolorruleminvalue && val1 <= blinkcolorrulemaxvalue) {
            if (this.blinkcount % 2 === 0) {
                $(group).find(".color").attr("fill", blinkcolorrulecolor);
            } else {
                $(group).find(".color").attr("fill", "transparent");
            }
        }

        this.tryProcessFlow(group);
    }

    svgCanvasMouseUp(e) {
        this.managerarray.forEach(manager => {
            manager.hide();
        });

        if (e.button === 2) { //right mouse up
            this.determineCType(e);
        }
    }

    determineCType(e) {
        var target = e.target;
        if (target.id === "svgroot") {
            // console.log("svgroot");
            return;
        }

        if ("image" === target.tagName) {
            var imgAttrMap = this.parseDataAttribute($(target).attr(this.dataAttribute));
            if (imgAttrMap) {
                var ctp = imgAttrMap.get("ctype");
                if (ctp === "graphic") {
                    this.showTheManager("image", e.clientX, e.clientY, target);
                }
            }
            return;
        }

        var target = target.parentNode; // g
        var targetgroup = null;

        while (target && this.terminalgroup != target) {
            var ctype = $(target).attr(this.dataAttribute);
            if (ctype) {
                targetgroup = target;
                break;
            } else {
                // console.log("666");
            }

            target = target.parentNode;
        }

        if (!targetgroup) {
            return;
        }

        var AttrMap = this.parseDataAttribute($(targetgroup).attr(this.dataAttribute));
        var ctype = AttrMap.get("ctype");


        var x = e.clientX;
        var y = e.clientY;

        this.showTheManager(ctype, x, y, targetgroup);
    }

    updateAll_IO_Names(dp_list) {
        dp_list.forEach(io => {
            $(".datapointselect").append($("<option value=" + io.name + ">" + io.name + " -- " + unescape(io.description) + "</option>"));
        });
    }

    parseDataAttribute(str) {
        if (!str || str === "") {
            return;
        }
        var pairs = str.split(";");
        pairs.pop();

        const AttrMap = new Map();

        for (var i = 0; i < pairs.length; ++i) {
            var pair = pairs[i];
            var key = pair.substring(0, pair.indexOf(":"));
            var value = pair.substring(pair.indexOf(":") + 1);
            AttrMap.set(key, value);
            // pair = pair.split(":");
            // if (pair.length === 2) {
            //     AttrMap.set(pair[0], pair[1]);
            // }
        }
        return AttrMap;
    }

    mouseenterGroupEvent() {
        var dataAttribute = $(this).attr(root.dataAttribute);
        if (dataAttribute) {
            var AttrMap = root.parseDataAttribute(dataAttribute);
            var datapoint = AttrMap.get("datapoint");
            $(root.tooltip).html(datapoint);
        }

        if (this.tagName === "image") {
            if (dataAttribute) {
                var AttrMap = root.parseDataAttribute(dataAttribute);

                var descriptiondp1e1 = AttrMap.get("descriptiondp1e1");
                var descriptiondp1e0 = AttrMap.get("descriptiondp1e0");
                var datapoint = AttrMap.get("datapoint");

                var val = parseInt(root.getValueFromDatabase(datapoint));
                if (val === 1) {
                    $(root.tooltip).html(descriptiondp1e1);
                } else if (val === 0) {
                    $(root.tooltip).html(descriptiondp1e0);
                }

            }
        }
    }

    mouseleaveGroupEvent() {
        $(this.tooltip).html("");
    }

    popupwindow(url, title, w, h) {
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    }

    htmlclick() {
        var AttrMap = root.parseDataAttribute($(this).attr(root.dataAttribute));
        var str = AttrMap.get("action");
        var datapoint = AttrMap.get("datapoint");
        if (str) {
            if (str === "None") {
                return;
            }
            str = str.split("(");
            var cmd = str[0].toLowerCase();
            var arg = str[1].replace(")", "");

            switch (cmd) {
                case "setpoint":
                    var val = root.getValueFromDatabase(datapoint);
                    root.popupwindow("/ic_sollwert.html?" + arg + "," + val, "", 600, 300);
                    break;
                case "goto":
                    window.location.href = arg;
                    break;
                case "toggle":
                    // console.log(datapoint);
                    var val = root.getValueFromDatabase(datapoint);

                    if (parseInt(val) >= 1) {
                        fetch("/wrsps?" + datapoint + "=0").then(response => response.text()).then((text) => {
                            // console.log(text);
                            G_Data.wrspsGetData();
                        });
                        // console.log("set to 0");
                    } else {
                        fetch("/wrsps?" + datapoint + "=1").then(response => response.text()).then((text) => {
                            // console.log(text);
                            G_Data.wrspsGetData();
                        });
                        // console.log("set to 1");
                    }

                    // if (parseInt(val) === 1) {
                    //     fetch("/wrsps?" + datapoint + "=0");
                    //     console.log("set to 0");
                    // } else if (parseInt(val) === 0) {
                    //     fetch("/wrsps?" + datapoint + "=1");
                    //     console.log("set to 1");
                    // } else {
                    //     console.log("value = ", val);
                    //     fetch("/wrsps?" + datapoint + "=0");
                    //     console.log("set to 0");
                    // }
                    break;
            }
        }
    }

    addPatchedMouseEventListener() {
        var url = window.location.href;
        url = url.substring(url.length - 5);

        this.terminalgroup = $($("#svgcontent")[0]).children("g")[1];
        this.tooltip = $(this.terminalgroup).find("title")[0];

        // console.log(window.location.href);
        var svgcontent = $("#svgcontent")[0];
        if (svgcontent) {
            var that = this;
            $(svgcontent).find("g[class]").each(function () {
                var AttrMap = that.parseDataAttribute($(this).attr(that.dataAttribute));
                var datapoint = AttrMap.get("datapoint");
                if (datapoint) {
                    this.addEventListener("mouseenter", that.mouseenterGroupEvent);
                    this.addEventListener("mouseleave", that.mouseleaveGroupEvent);

                    if (typeof IsHtmlPage != "undefined") {
                        this.addEventListener("click", that.htmlclick);
                    }
                }
            });
            $(svgcontent).find("image[class]").each(function () {
                var AttrMap = that.parseDataAttribute($(this).attr(that.dataAttribute));
                var datapoint = AttrMap.get("datapoint");
                if (datapoint) {
                    this.addEventListener("mouseenter", that.mouseenterGroupEvent);
                    this.addEventListener("mouseleave", that.mouseleaveGroupEvent);

                    if (typeof IsHtmlPage != "undefined") {
                        this.addEventListener("click", that.htmlclick);
                    }
                }
            });
        }

        setTimeout(() => {
            this.addPatchedMouseEventListener();
        }, 2000);
    }

}

var root = new Root();

new DataManager(root);
new TextManager(root);
new GraphicManager(root);
new GaugeManager(root);
new BarManager(root);
new TableManager(root);
new ImgManager(root);