import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

export default function Card({index, children, moveCard}) {
    const ref = useRef(null);
    const [, drop] = useDrop({
        // Accept will make sure only these element type can be droppable on this element
        accept: 'Card',
        hover(item) {

        }
    });

    const [{ isDragging }, drag] = useDrag(() => ({
        // what type of item this to determine if a drop target accepts it
        type: 'Card',
        // data of the item to be available to the drop methods
        item: { id: index },
        // method to collect additional data for drop handling like whether is currently being dragged
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    }));

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>{children}</div>
    );
}
