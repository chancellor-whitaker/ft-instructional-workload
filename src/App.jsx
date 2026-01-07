import { themeBalham } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import useData from "./useData";

const myTheme = themeBalham.withParams({
  headerBackgroundColor: "#E6B8B7",
  headerTextColor: "black",
});

export default function App() {
  const data = useData("data.json");

  const rowData = [data].filter(Boolean).flat();

  const columnDefs = [...new Set(rowData.map(Object.keys).flat())].map(
    (field, index) => ({ type: index === 0 ? null : "rightAligned", field })
  );

  const defaultColDef = {
    autoHeaderHeight: true, // Adjust Cell Height to Fit Wrapped Text
    suppressMovable: true,
    wrapHeaderText: true, // Wrap Text
    initialWidth: 200, // Optional: Set a default size
    lockVisible: true,
    sortable: false,
    cellStyle,
  };

  return (
    <>
      <div>
        <div>
          <AgGridReact
            onGridSizeChanged={autoSizeResponsively}
            onRowDataUpdated={autoSizeResponsively}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            rowData={rowData}
            theme={myTheme}
          ></AgGridReact>
        </div>
      </div>
      <div className="small">
        <div className="p fw-medium fs-5 my-0">
          <u>Notes:</u>
        </div>
        <div className="ul my-2">
          <div className="li">Data as of November 1, 2025</div>
          <div className="li">
            Distinct Count of Fulltime Instructors: Fulltime Instructors who
            have an instructional and/or non-instructional assignment for Fall
            2025 in Banner.
          </div>
        </div>
        <div className="p strong">Fulltime Instructors</div>
        <div className="ul">
          <div className="li">
            Includes: ASL Specialist, Assistant, Associate, Clinical,
            Instructor, Lecturer, Professor, Senior, Visiting and Department
            Chairs
          </div>
          <div className="li">
            Excludes: Deans, Model, and fulltime staff who teach part-time
          </div>
        </div>
        <div className="p strong">Generated Credit Hours</div>
        <div className="ul">
          <div className="li">CRN Enrollment * CRN Credit Hours</div>
          <div className="li">
            For courses with multiple instructors and/or facilitators, the
            generated credit hours are distributed equally among all those
            teaching, unless SIRASGN percent responsibility indicates otherwise.
          </div>
          <div className="li">
            Generated credit hours follow the instructor; therefore, if an
            instructor is teaching in two different colleges, all of their
            generated credit hours would be assigned to their home college.
          </div>
        </div>
        <div className="p strong">
          Credit Hours per Full-Time Instructor "Full-Time Instructional
          Workload":
        </div>
        <div className="ul">
          <div className="li">
            The number of generated credit hours divided by the number of
            distinct faculty.
          </div>
          <div className="li">Goal is 300 by 2030</div>
        </div>
        <p>
          <i>
            For additional information, contact{" "}
            <a
              className="text-primary text-decoration-underline"
              href="mailto:bethany.miller@eku.edu"
            >
              Bethany Miller
            </a>
          </i>
        </p>
      </div>
    </>
  );
}

const autoSizeResponsively = (e) => {
  const colDefs = e.api.getColumnDefs();

  if (e.type === "gridSizeChanged") {
    if (e.clientWidth / colDefs.length > 200) {
      e.api.sizeColumnsToFit();
    } else {
      e.api.autoSizeAllColumns();
    }
  } else {
    e.api.sizeColumnsToFit();
  }
};

const cellStyle = (params) => {
  if (
    params.data["FALL 2025"].startsWith("College of") ||
    params.data["FALL 2025"].startsWith("Grand Total")
  ) {
    return {
      backgroundColor: "#F2DCDB",
      fontWeight: "bold",
      color: "black",
    };
  }
  return null;
};

/*
Notes:
Data as of November 1, 2025
Distinct Count of Fulltime Instructors: Fulltime Instructors who have an instructional and/or non-instructional assignment for Fall 2025 in Banner.
Fulltime Instructors
	Includes: ASL Specialist, Assistant, Associate, Clinical, Instructor, Lecturer, Professor, Senior, Visiting and Department Chairs
	Excludes: Deans, Model, and fulltime staff who teach part-time
Generated Credit Hours
	CRN Enrollment * CRN Credit Hours
	For courses with multiple instructors and/or facilitators, the generated credit hours are distributed equally among all those teaching, unless SIRASGN percent responsibility indicates otherwise.
	Generated credit hours follow the instructor; therefore, if an instructor is teaching in two different colleges, all of their generated credit hours would be assigned to their home college.
Credit Hours per Full-Time Instructor "Full-Time Instructional Workload":
	The number of generated credit hours divided by the number of distinct faculty.
	Goal is 300 by 2030
*/
