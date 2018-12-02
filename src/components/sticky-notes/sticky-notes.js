import React from 'react';
import './sticky-notes.css';
import DraggableNote from '../draggable-note/draggable-note';

/**
 * Xác định vị trí top, left của 1 element so với document
 * Tham khảo: https://bit.ly/2qBz4KK
 */
function getOffset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

export default class StickyNotes extends React.Component {
  constructor(props) {
    super(props);

    // Giá trị khởi tạo cho state của mỗi note
    this.initialStateForEachNote = {
      title: this.props.title || 'Click here to move',
      width: this.props.width || 300,
      height: this.props.height || 300,
      top: this.props.top || 0,
      left: this.props.left || 0,
      content: this.props.content || ''
    }

    /**
     * Biến đếm - đại diện cho id của mỗi note thêm vào,
     * biến này sẽ tăng dần 1 đơn vị mỗi khi thêm một note
     */
    this.count = 0;

    /**
     * khởi tạo state cho Component, với:
     *  + activeId: là giá trị id của note đang được active
     *  + notes: là mảng lưu lại thông tin của các note
     */
    this.state = {
      activeId: this.count,
      notes: [
        this.initNoteData()
      ]
    }

    this.initNoteData = this.initNoteData.bind(this);
    this.onAddNote = this.onAddNote.bind(this);
    this.onRemoveNote = this.onRemoveNote.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  /**
   * Khởi tạo thông tin cho mỗi note mới được tạo lên, 
   * với offset là thông tin về vị trí của note hiện tại
   * 
   * Mình dựa vào đó để tính vị trí của note mới thêm vào.
   */
  initNoteData(offset) {
    // mỗi lần tạo một note mới thì this.count++
    const noteData = {
      ...this.initialStateForEachNote,
      id: this.count++
    };

    if (offset) {
      noteData.top = offset.top + 20;
      noteData.left = offset.left + 20;
    }

    return noteData;
  }

  /**
   * Xử lý event khi người dùng click vào dấu cộng (+) để thêm note
   */
  onAddNote(event) {
    /**
    * Dừng việc lan truyền event, đảm bảo khi click vào dấu cộng (+) 
    * để thêm note mới thì chỉ hàm này được gọi, không lan truyền đến hàm khác
    */ 
    event.stopPropagation();

    // Lấy vị trí của note hiện tại, từ đó tính toán vị trí của note mới
    const offset = getOffset(event.target);
    const noteData = this.initNoteData(offset);

    // Cập nhật lại state
    this.setState((state) => {
      return {
        activeId: noteData.id,
        notes: [
          ...state.notes,
          noteData
        ]
      }
    })
  }

  /**
   * Xử lý khi người dùng click vào dầu nhân (x) để bỏ note.
   * Trong đó, id là giá trị id - để phân biệt các note.
   */
  onRemoveNote(id) {
    // Nếu hiện tại chỉ có 1 note thì không cho phép xoá note đi
    if (this.state.notes.length === 1) return;

    // Dùng filter lọc lấy các note có id khác với id cần xoá
    this.setState((state) => {
      const remainNotes = [...state.notes].filter((note) => {
        return note.id !== id;
      });

      return {
        activeId: remainNotes[remainNotes.length - 1].id,
        notes: remainNotes
      }
    });
  }

  /**
   * Vì có nhiều note nên chúng có thể chồng lên nhau.
   * Do đó, hàm này nhằm mục đích làm cho một note,
   * ứng với id truyền vào được active - nghĩa là,
   * nó sẽ được hiển thị lên trên so với các note còn lại.
   * 
   * Cụ thể là note active sẽ có z-index = 1, các cái còn lại,
   * sẽ có z-index = 0.
   * 
   * Ngoài ra, chỉ update state nếu giá trị id mới cần update khác với 
   * giá trị hiện tại.
   */
  makeActive(id) {
    if (this.state.activeId !== id) {
      this.setState({
        activeId: id
      });
    }
  }

  /**
   * Hàm này được gọi lên từ mỗi Draggable Note.
   * Khi có một note ứng với id - thay đổi dữ liệu của nó,
   * bao gồm một trong các loại: width, height, top, left, content,
   * thì hàm này được gọi để cập nhật lại state cho component.
   */
  handleDataChange(id, data) {
    this.setState((state) => {
      const newNotes = [...state.notes].map(note => {
        if (note.id === id) {
          if (data.width !== undefined) note.width = data.width;
          if (data.height !== undefined) note.height = data.height;
          if (data.top !== undefined) note.top = data.top;
          if (data.left !== undefined) note.left = data.left;
          if (data.content !== undefined) note.content = data.content;
        }

        return note;
      })

      return {
        notes: newNotes
      }
    });
  }

  render() {
    /**
     * Khác với Draggable bình thường, mỗi note của StickyNotes
     * cần phải có thêm 2 button: (+) để thêm note và (x) để xoá note.
     * Vì vậy, mình cần định nghĩa nó là header - 
     * để truyền vào thuộc tính title của DraggableNote
     */
    const header = (title, id) => (
      <div className="lp-sticky-notes-header">
        <span className="add" onClick={this.onAddNote}>+</span>
        <span>{title}</span>
        <span className="remove" onClick={() => this.onRemoveNote(id)}>x</span>
      </div>
    )

    /**
     * Khác với việc sử dụng DraggableNote thông thường,
     * phần này mình có nhiều DragableNote - mà cho phép thêm, xoá note.
     * 
     * Vì vậy, mình cần truyền vào;
     *   + id: để phân biệt note
     *   + zIndex: để hiển thị lên top cái note đang được active
     *   + handleDataChange: là hàm callback, để mỗi khi một note thay đổi
     *      thì hàm này sẽ được gọi để cập nhật state.
     */
    return (
      <React.Fragment>
        {
          this.state.notes.map((note, index) => {
            return (
              <div
                onClick={() => this.makeActive(note.id)}
                key={index}
              >
                <DraggableNote
                  title={header(note.title, note.id)}
                  width={note.width}
                  height={note.height}
                  top={note.top}
                  left={note.left}
                  content={note.content}
                  zIndex={note.id === this.state.activeId ? 1 : 0}
                  id={note.id}
                  handleDataChange={this.handleDataChange}
                />
              </div>
            )
          })
        }
      </React.Fragment>
    )
  }
}