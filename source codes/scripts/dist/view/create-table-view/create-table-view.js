"use strict";

System.register(["./delete-all-attr-btn-view.js"], function (_export, _context) {
  "use strict";

  var DeleteAllAttrBtnView;

  function CreateTableView() {
    this.addEventListeners = function () {
      listenOnClickCreateTableBtn();
      listenOnClickAddAttributeBtn();
      new DeleteAllAttrBtnView().addEventListeners();
    };

    function listenOnClickCreateTableBtn() {
      var elem = document.getElementById("create-table-btn");
      elem.addEventListener("click", function () {
        return toggleCreateTablePage(elem);
      });
    }

    function toggleCreateTablePage(elem) {
      var faCaretElem = elem.querySelector("i");
      toggleFaCaretUpAndDown(faCaretElem);
      var page = elem.nextElementSibling;

      if (page.style.maxHeight) {
        //not zero, not empty string, not null
        page.style.maxHeight = null;
        page.style.overflow = "hidden";
      } else {
        page.style.maxHeight = page.scrollHeight + "px";
        page.style.overflow = "visible";
      }
    }

    function toggleFaCaretUpAndDown(elem) {
      var classes = elem.classList;
      var upClass = "fa-caret-up";
      var downClass = "fa-caret-down";

      if (classes.contains(downClass)) {
        elem.classList.remove(downClass);
        elem.classList.add(upClass);
      } else if (classes.contains(upClass)) {
        elem.classList.remove(upClass);
        elem.classList.add(downClass);
      }
    }

    function listenOnClickAddAttributeBtn() {
      var elem = document.getElementById("add-attribute-btn");
      elem.addEventListener("click", function () {
        enableDeleteAllAttributesBtn();
        addAnAttributeControlItem(elem);
      });
    }

    function enableDeleteAllAttributesBtn() {
      var btn = document.getElementById("delete-all-attributes-btn");

      if (btn.disabled) {
        btn.disabled = false;
      }
    }

    function addAnAttributeControlItem() {
      var attrDefElem = document.getElementById("attribute-definitions");
      var attrCtrlItem = getAttributeControlItem();
      attrDefElem.appendChild(attrCtrlItem);
    }

    function getAttributeControlItem() {
      var attrCtrlItem = document.createElement("div");
      attrCtrlItem.className = "attribute-control-item";
      var deleteBtn = getDeleteAttributeControlItemBtn();
      attrCtrlItem.appendChild(deleteBtn);
      var typeDropdown = getAttributeTypeDropdown();
      attrCtrlItem.appendChild(typeDropdown);
      var attrNameInputElem = getAttributeNameInputElem();
      attrCtrlItem.appendChild(attrNameInputElem);
      addEventListenersOnAttributeControlItem(attrCtrlItem);
      return attrCtrlItem;
    }

    function getDeleteAttributeControlItemBtn(attrCtrlItem) {
      var btn = document.createElement("img");
      btn.src = "../../../resources/create-table-page/delete-attribute-btn.png";
      btn.className = "delete-attribute-control-item-btn";
      return btn;
    }

    function getAttributeTypeDropdown() {
      var dropdown = document.createElement("div");
      dropdown.className = "attribute-type-dropdown";
      var btn = getAttributeTypeBtn();
      dropdown.appendChild(btn);
      var contents = getAttributeTypeContents();
      dropdown.appendChild(contents);
      return dropdown;
    }

    function getAttributeTypeBtn() {
      var btn = document.createElement("button");
      btn.textContent = "Type";
      btn.classList = "attribute-type-btn";
      return btn;
    }

    function getAttributeTypeContents() {
      var contents = document.createElement("div");
      contents.className = "attribute-type-contents";
      var typeString = document.createElement("a");
      typeString.href = "#string";
      typeString.textContent = "string";
      contents.appendChild(typeString);
      var typeNumber = document.createElement("a");
      typeNumber.href = "#number";
      typeNumber.textContent = "number";
      contents.appendChild(typeNumber);
      var typeBoolean = document.createElement("a");
      typeBoolean.href = "#boolean";
      typeBoolean.textContent = "boolean";
      contents.appendChild(typeBoolean);
      return contents;
    }

    function getAttributeNameInputElem() {
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("placeholder", "Enter attribute name...");
      input.required = true;
      input.className = "attribute-name-input";
      return input;
    }

    function addEventListenersOnAttributeControlItem(item) {
      addClickEventListenerOnDeleteBtn(item);
      addClickEventListenerOnAttributeTypeBtn(item);
    }

    function addClickEventListenerOnDeleteBtn(parent) {
      var deleteButtons = Array.from(parent.getElementsByClassName("delete-attribute-control-item-btn"));
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
        document.getElementById("delete-all-attributes-btn").disabled = true;
      }
    }

    function addClickEventListenerOnAttributeTypeBtn(parent) {
      var attributeTypeButtons = Array.from(parent.getElementsByClassName("attribute-type-btn"));
      attributeTypeButtons.forEach(function (btn) {
        return btn.addEventListener("click", function (e) {
          return showAttributeTypeContents(e);
        });
      });
    }

    function showAttributeTypeContents(event) {
      var dropdown = event.target.parentElement;
      var contents = dropdown.querySelector(".attribute-type-contents");
      var display = window.getComputedStyle(contents).getPropertyValue("display");

      if (display === "none") {
        contents.style.display = "block";
      } else {
        contents.style.display = "none";
      }
    }
  }

  _export("CreateTableView", CreateTableView);

  return {
    setters: [function (_deleteAllAttrBtnViewJs) {
      DeleteAllAttrBtnView = _deleteAllAttrBtnViewJs.DeleteAllAttrBtnView;
    }],
    execute: function () {}
  };
});