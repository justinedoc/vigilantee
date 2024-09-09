export function MembersTable() {
  return (
    <table>
      <tbody>
        <tr>
          <th>STATUS</th>
          <th>NAME</th>
          <th>RANK</th>
          <th>DOMAIN</th>
          <th>AUTH</th>
          <th>DATE JOINED</th>
          <th>SELECT</th>
          <th>
            <span></span>
          </th>
          <th>
            <span></span>
          </th>
        </tr>
        <TableRowDetails />
      </tbody>
    </table>
  );
}

function TableRowDetails() {
  return (
    <tr>
      <td>
        <span className="member__active">Active</span>
      </td>
      <td>Onyiriuka Justin Ifeanyi</td>
      <td>Officer</td>
      <td>N/A</td>
      <td>
        <button className="verify">Verify</button>
      </td>
      <td>12/23/2023</td>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <button className="edit__btn">Edit</button>
      </td>
      <td className="addBtn">{">"}</td>
    </tr>
  );
}
