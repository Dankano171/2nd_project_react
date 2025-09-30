import React from "react";
import PropTypes from "prop-types";

/**
 * Reusable List component
 * - items: array of data objects
 * - renderItem: optional function (item) => JSX to render a single item
 * - itemKey: optional function (item) => unique key
 */
export default function List({ items, renderItem, itemKey, className }) {
  if (!Array.isArray(items)) {
    return null;
  }

  if (items.length === 0) {
    return <div role="status" aria-live="polite">No items to display.</div>;
  }

  return (
    <ul className={className ?? "list"} aria-label="items list">
      {items.map((item, idx) => {
        const key = itemKey ? itemKey(item) : item.id ?? idx;
        return (
          <li key={key} className="list-item">
            {renderItem ? renderItem(item) : (
              <div>
                <strong>{item.title ?? item.name ?? `Item ${idx + 1}`}</strong>
                {item.body && <div>{item.body}</div>}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
  itemKey: PropTypes.func,
  className: PropTypes.string,
};

List.defaultProps = {
  items: [],
};
