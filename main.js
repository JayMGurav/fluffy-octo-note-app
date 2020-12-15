(function () {
  // model
  const modelTheMouse = {
    init: function initModel() {
      if (!localStorage.notes) {
        localStorage.setItem('notes', JSON.stringify([]));
        this.size = 0;
        localStorage.setItem('notes_size', 0);
      }
    },
    add: function addToModel(obj) {
      let notesData = this.getAll();
      notesData.push(obj);
      this.incrSize();
      localStorage.notes = JSON.stringify(notesData);
    },
    remove: function removeFromModel(id) {
      this.decrSize();
    },
    getAll: function getAllFromModel() {
      return JSON.parse(localStorage.getItem('notes'));
    },
    incrSize: function incrSizeOfModel() {
      let size = this.size() + 1;
      localStorage.setItem('notes_size', size);
    },
    decrSize: function decrSizeOfModel() {
      let size = this.size() - 1;
      localStorage.setItem('notes_size', size);
    },
    size: function sizeOfModel() {
      return Number(localStorage.getItem('notes_size', this.size))
    }
  }
  // cotroller
  const controllerTheCat = {
    addNewNote: function addNewNote(title = '', content = '') {
      modelTheMouse.add({
        title,
        content,
        createAt: Date.now(),
        id: modelTheMouse.size() + 1
      });
    },
    getNotes: function getNotes() {
      return modelTheMouse.getAll();
    },
    init: function initController() {
      modelTheMouse.init();
      viewTheVulture.init();
    }
  }
  // view
  const viewTheVulture = {
    init: function initView() {
      this.notesList = document.getElementById('notes');
      let newNoteForm = document.getElementById('note_form'),
        newNoteTitle = document.getElementById('new_note_title'),
        newNoteContent = document.getElementById('new_note_content'),
        delete_note = document.getElementById('delete_note');
      // on submission of note form
      newNoteForm.onsubmit = function newNoteFormSubmit(event) {
        event.preventDefault();
        let title = newNoteTitle.value,
          content = newNoteContent.value;
        controllerTheCat.addNewNote(title, content);
        newNoteTitle.value = '';
        newNoteContent.value = '';
        viewTheVulture.render();
      }
      // delete note
      // delete_note.onclick = function deleteNote(params) {
      //   let id = this.data.id;
      //   console.log(id);
      // }
      viewTheVulture.render();
    },
    render: function renderView() {
      let htmlStr = '';
      controllerTheCat.getNotes().forEach(note => {
        htmlStr += `
          <li data-id=${note.id} class="note">
            <strong>${note.title}</strong>
            <p>${note.content}</p>
            <small>Created on: <time>${new Date(note.createAt).toDateString()}</time></small>
            <button class="btn btn_danger" id="delete_note" data-id=${note.id}>Delete</button>
          </li>
        `;
      });
      this.notesList.innerHTML = htmlStr;
    }
  }
  controllerTheCat.init();
})()