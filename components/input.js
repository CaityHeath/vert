import React from "react";

export default props =>
  console.log("props", props) || (
    <section className="form">
      <h1> {props.plant} </h1>
      <div>Watering schedule:{props.schedule} </div>
      <button>Add to Calendar</button>

      <form onSubmit={props.submit}>
        <input
          placeholder="Type a plant name"
        />
        <select value={props.schedule} onChange={props.scheduleChange}>
          <option value='weekly'> Weekly </option>
          <option value='biMonthly'>Bi-Monthly</option>
          <option value='monthly'>Monthly</option>
          <option value='sixwks'>Six Weeks</option>
        </select>

      </form>
    </section>
  );
