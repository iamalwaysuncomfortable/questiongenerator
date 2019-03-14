import React from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';


class ExistingDocTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let cols = [
            {field: 'questions', header: 'Phrases'},
        ];

        let dynamicColumns = cols.map((col,i) => {
            return <Column key={col.field} header={col.header} />;
        });
        console.log(this.props.docEvents);
        return (
            <DataTable value={this.props.docEvents}>
                {dynamicColumns}
            </DataTable>
        );
    }
}

export default ExistingDocTable;
