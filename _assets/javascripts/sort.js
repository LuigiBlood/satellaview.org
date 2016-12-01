class SortableTables {
  constructor(element) {
    if (element == null) { return; }
    this.element = element;

    // We require headers to sort.
    const headers = this.element.querySelectorAll('thead th');
    if (headers.length <= 0) { return; }

    // Init
    this.header_info = [];
    this.sortColumn = this.sortColumn.bind(this);

    // Get column indexes, sort directions, sort types and sort value attribute locations.
    let j = 0;
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      j += parseInt(header.getAttribute('colspan') || 1, 10);
      this.header_info[i] = {
        index: j,
        sort: header.dataset.sortType || 'string',
        direction: header.dataset.sortDirection || 'asc',
        value: header.dataset.sortValue,
      };

      // Listen for clicks.
      header.addEventListener('click', this.sortColumn);
    }
  }

  sortColumn(ev) {
    if (ev == null) { return; }
    const index = ev.target.cellIndex;

    // Sorting direction
    let sort_direction = this.header_info[index].direction;
    sort_direction = sort_direction === 'asc' ? 'desc' : 'asc';
    this.header_info[index].direction = sort_direction;
    ev.target.dataset.sortDirection = sort_direction;

    let rows = this.element.querySelectorAll('tbody tr');

    // Extract the data for the column to sort and pair it up with the row.
    const row_values = [];
    for (let row of rows) {
      const node = row.querySelector(`td:nth-child(${this.header_info[index].index})`);
      const value = this.header_info[index].value ? node.getAttribute(this.header_info[index].value) : node.textContent;
      row_values.push([value, row]);
    }

    // Sort by the data-order-by value
    const sort_function = this.sortFunction(this.header_info[index].sort);
    row_values.sort((a, b) => sort_function(a[0], b[0]));
    if (sort_direction !== 'asc') { row_values.reverse(); }

    rows = row_values.map(row => row[1]);

    const body = this.element.querySelector('tbody');
    rows.map(row => body.appendChild(row));
  }

  sortFunction(type) {
    return (() => {
      switch (type) {
        case 'integer': return (a, b) => parseInt(a, 10) - parseInt(b, 10);
        case 'float': return (a, b) => parseFloat(a) - parseFloat(b);
        case 'date': return (a, b) => new Date(a) - new Date(b);
        case 'lowercase': return (a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase());
        case 'string':
        default: return (a, b) => a.localeCompare(b);
      }
    })();
  }

  destroy() {
    for (let header of this.element.querySelectorAll('thead th')) {
      header.removeEventListener('click', this.sortColumn);
    }
    this.header_info = null;
    this.element = null;
  }

  static sort(element) {
    const st = new SortableTables(element);
  }
}
