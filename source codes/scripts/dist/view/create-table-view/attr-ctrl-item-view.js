"use strict";

System.register(["../common-components/dropdown-view.js"], function (_export, _context) {
  "use strict";

  var DropdownView, itemNum, ATTR_TYPES;

  function AttrCtrlItemView() {}

  function getAttrCtrlItemDoc(id) {
    var tblRow = document.createElement("tr");
    tblRow.className = "attr-ctrl-item";
    tblRow.id = id;
    var deleteBtn = getAttrCtrlItemDeleteBtn();
    var td1 = document.createElement("td");
    td1.appendChild(deleteBtn);
    tblRow.appendChild(td1);
    var typeDropdown = getAttrTypeDropdown();
    var td2 = document.createElement("td");
    td2.appendChild(typeDropdown);
    tblRow.appendChild(td2);
    var attrNameInput = getAttrNameInput();
    var td3 = document.createElement("td");
    td3.appendChild(attrNameInput);
    tblRow.appendChild(td3);
    return tblRow;
  }

  function getAttrCtrlItemDeleteBtn(attrCtrlItem) {
    var btn = document.createElement("img");
    btn.src = "../../../resources/create-table-page/delete-attribute-btn.png";
    btn.className = "delete-attr-ctrl-item-btn";
    return btn;
  }

  function getAttrTypeDropdown() {
    var dropdown = DropdownView.getDropdownDoc();
    return dropdown;
  }

  function getAttrNameInput() {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.required = true;
    input.className = "attr-name-input";
    return input;
  }

  function addEventListeners(attrCtrlItemElem) {
    listenOnClickDeleteBtn(attrCtrlItemElem);
    listenOnClickAttrTypeBtn(attrCtrlItemElem);
  }

  function listenOnClickDeleteBtn(attrCtrlItemElem) {
    var deleteBtn = attrCtrlItemElem.querySelector(".delete-attr-ctrl-item-btn");
    deleteBtn.addEventListener("click", function () {
      attrCtrlItemElem.remove();
      var num = document.querySelectorAll(".attr-ctrl-item").length;

      if (num == 0) {
        DeleteAllAttrBtnView.disableBtn();
        AttrCtrlItemView.createAnItem();
      }
    });
  }

  function listenOnClickAttrTypeBtn(attrCtrlItemElem) {
    DropdownView.listenOnClickDropdownBtn(attrCtrlItemElem, function () {
      return Object.values(ATTR_TYPES);
    }, "Attribute types are not defined");
  }

  _export("AttrCtrlItemView", AttrCtrlItemView);

  return {
    setters: [function (_commonComponentsDropdownViewJs) {
      DropdownView = _commonComponentsDropdownViewJs.DropdownView;
    }],
    execute: function () {
      itemNum = 0;

      AttrCtrlItemView.createAnItem = function () {
        var itemTbl = document.querySelector("#attr-ctrl-item-tbl");
        var id = "item" + itemNum.toString();
        itemTbl.appendChild(getAttrCtrlItemDoc(id));
        addEventListeners(itemTbl.querySelector("#" + id));
        itemNum++;
      };

      _export("ATTR_TYPES", ATTR_TYPES = {
        string: "string",
        number: "number",
        "boolean": "boolean"
      });
    }
  };
});