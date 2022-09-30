import "../style.css";
import DrawModule from "../../module/draw";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
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
                      key={module._id || module.id}
                      draggableId={module._id || String(module.id)}
                      index={position}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DrawModule
                            isSelected={
                              props.moduleIdSelected &&
                              module._id === props.moduleIdSelected
                            }
                            module={module}
                            position={position}
                            handleSelectModule={(e) => {
                              if (module._id)
                                props.handleSelectModule(e, module._id);
                              else props.handleSelectModule(e, module.id);
                            }}
                            handleDeleteModule={(e) => {
                              if (module._id)
                                props.handleDeleteModule(e, module._id);
                              else props.handleDeleteModule(e, module.id);
                            }}
                            handleEditModule={(e) => {
                              if (module._id)
                                props.handleEditModule(e, module._id);
                              else props.handleEditModule(e, module.id);
                            }}
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

export default DrawModules;
