import "../style.css";
import { connect } from "react-redux";
import DrawModule from "../../module/draw";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import { setModules } from "../../../reducers/moduleReducer";
const DrawModules = (props) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      props.modules,
      result.source.index,
      result.destination.index
    );

    props.setModules(items);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="drag-drop-container">
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable-container"
            >
              <article className="leaderboard">
                <main className="leaderboard__profiles">
                  {props.modules.map((module, position) => (
                    <Draggable
                      key={module._id}
                      draggableId={module._id}
                      index={position}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DrawModule
                            isSelected={module._id === props.moduleIdSelected}
                            module={module}
                            position={position}
                            handleSelectModule={(e) =>
                              props.handleSelectModule(e, module._id)
                            }
                            handleDeleteModule={(e) =>
                              props.handleDeleteModule(e, module._id)
                            }
                            handleEditModule={(e) =>
                              props.handleEditModule(e, module._id)
                            }
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </main>
              </article>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModules: (modules) => dispatch(setModules(modules)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawModules);
