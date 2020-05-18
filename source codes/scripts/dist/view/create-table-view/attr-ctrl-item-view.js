"use strict";

System.register(["../common-components/dropdown-view.js", "../common-components/common-functions.js"], function (_export, _context) {
  "use strict";

  var DropdownView, CommonFunctions, DEFAULT_TYPE_TEXT, ATTR_TYPES;

  function AttrCtrlItemView() {
    this.createAnItem = function () {
      var itemDoc = getDoc();
      var itemTbl = document.querySelector("#attr-ctrl-item-tbl>tbody");
      itemTbl.appendChild(itemDoc);
      addEventListeners(itemTbl.lastChild);
    };

    function getDoc() {
      var tblRow = document.createElement("tr");
      var deleteBtn = getDeleteAttributeControlItemBtn();
      var td1 = document.createElement("td");
      td1.appendChild(deleteBtn);
      tblRow.appendChild(td1);
      var typeDropdown = getAttributeTypeDropdown();
      var td2 = document.createElement("td");
      td2.appendChild(typeDropdown);
      tblRow.appendChild(td2);
      var attrNameInputElem = getAttributeNameInputElem();
      var td3 = document.createElement("td");
      td3.appendChild(attrNameInputElem);
      tblRow.appendChild(td3);
      return tblRow;
    }

    function getDeleteAttributeControlItemBtn(attrCtrlItem) {
      var btn = document.createElement("img");
      btn.src = "../../../resources/create-table-page/delete-attribute-btn.png";
      btn.className = "delete-attr-ctrl-item-btn";
      return btn;
    }

    function getAttributeTypeDropdown() {
      var dropdownView = new DropdownView();
      var dropdown = dropdownView.getDropdownDoc();
      dropdown.classList.add("attribute-type-dropdown");
      dropdownView.createListItemElems(dropdown.querySelector(".dropdown-list"), Object.values(ATTR_TYPES));
      /*const input = getAttributeTypeInput();
      dropdown.appendChild(input);
      
      const contents = getAttributeTypeContents();
      dropdown.appendChild(contents);*/

      return dropdown;
    }

    function getAttributeTypeInput() {
      var input = document.createElement("input");
      input.placeholder = "Choose a type";
      input.classList = "attribute-type-btn";
      return input;
    }

    function getAttributeNameInputElem() {
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("placeholder", "Enter attribute name...");
      input.required = true;
      input.className = "attribute-name-input";
      return input;
    }

    function addEventListeners(item) {
      listenOnClickDeleteBtn(item);
      listenOnClickAttrTypeInput(item);
      listenOnClickTypeListItems(item);
    }

    function listenOnClickDeleteBtn(parent) {
      var deleteButtons = Array.from(parent.getElementsByClassName("delete-attr-ctrl-item-btn"));
      deleteButtons.forEach(function (btn) {
        return btn.addEventListener("click", function (e) {
          disableDeleteAllBtnWhenNoItem();
          deleteAttributeControlItem(e);
        });
      });
    }

    function deleteAttributeControlItem(event) {
      event.target.parentElement.remove();
    }

    function disableDeleteAllBtnWhenNoItem() {
      var num = document.getElementsByClassName("attribute-control-item").length;

      if (num - 1 == 0) {
        document.getElementById("delete-all-attr-ctrl-item-btn").disabled = true;
      }
    }

    function listenOnClickAttrTypeInput(parent) {
      console.log("Enter listenOnClickAttrTypeInput()");
      var attributeTypeBtn = parent.querySelector(".dropdown-btn");
      console.log("attributeTypeBtn", attributeTypeBtn.outerHTML);
      attributeTypeBtn.addEventListener("click", function (e) {
        return showOrHideTypeList(e);
      });
    }

    function showOrHideTypeList(event) {
      var dropdown = event.target.parentElement;
      console.log("dropdown", dropdown.outerHTML);
      var listElem = dropdown.querySelector(".dropdown-list");
      new CommonFunctions().showOrHideElement(listElem);
      /*const display = window.getComputedStyle(list).getPropertyValue("display");
      if(display === "none") {
          contents.style.display = "block";
      }
      else {
          contents.style.display = "none";
      }*/
    }

    function listenOnClickTypeListItems(item) {
      var typeListItems = Array.from(item.querySelectorAll(".attribute-type-list>a"));
      typeListItems.forEach(function (elem) {
        return elem.addEventListener("click", function (e) {
          replaceTypeBtnText(e, item);
          hideTypeList(item);
        });
      });
    }

    function replaceTypeBtnText(event, attrCtrlItem) {
      var text = event.target.textContent;
      var typeBtn = attrCtrlItem.querySelector(".attribute-type-btn"); //typeBtn.textContent = text;

      typeBtn.value = text;
    }

    function hideTypeList(attrCtrlItem) {
      var typeList = attrCtrlItem.querySelector(".attribute-type-list");
      typeList.style.display = "none";
    }
  }

  _export("AttrCtrlItemView", AttrCtrlItemView);

  return {
    setters: [function (_commonComponentsDropdownViewJs) {
      DropdownView = _commonComponentsDropdownViewJs.DropdownView;
    }, function (_commonComponentsCommonFunctionsJs) {
      CommonFunctions = _commonComponentsCommonFunctionsJs.CommonFunctions;
    }],
    execute: function () {
      _export("DEFAULT_TYPE_TEXT", DEFAULT_TYPE_TEXT = "Type");

      _export("ATTR_TYPES", ATTR_TYPES = {
        string: "string",
        number: "number",
        "boolean": "boolean"
      });
    }
  };
});