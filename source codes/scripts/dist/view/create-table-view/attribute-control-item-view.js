"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function AttrCtrlItemView() {
    this.getDoc = function () {
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
    };

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
      contents.className = "attribute-type-list";
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
      var contents = dropdown.querySelector(".attribute-type-list");
      var display = window.getComputedStyle(contents).getPropertyValue("display");

      if (display === "none") {
        contents.style.display = "block";
      } else {
        contents.style.display = "none";
      }
    }
  }

  _export("AttrCtrlItemView", AttrCtrlItemView);

  return {
    setters: [],
    execute: function () {}
  };
});