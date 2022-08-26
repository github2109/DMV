import "../style.css";
import { connect } from "react-redux";
import DrawModule from "../../module/draw";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
const DrawModules = (props) => {
  const [modules, setModules] = useState(props.modules);
  useEffect(() => {
    setModules(props.modules);
  }, [props.modules]);
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
      modules,
      result.source.index,
      result.destination.index
    );

    setModules(items);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="modules-container">
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="droppable-container">
              <article className="leaderboard">
                <main className="leaderboard__profiles">
                  {modules.map((module, position) => (
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
                          <DrawModule module={module} position={position} />
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

export default connect(mapStateToProps)(DrawModules);
