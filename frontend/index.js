$(document).ready(function () {
  var table = $("#table").DataTable({
    orderCellsTop: true,
    searching: true,
    fixedHeader: true,
    columnDefs: [
      { className: "Turno", targets: [0], name: "Turno", title: "Turno" },
      { className: "UF", targets: [1], name: "UF", title: "UF" },
      { className: "Zona", targets: [2], name: "Zona", title: "Zona" },
      { className: "Sessao", targets: [3], name: "Sessao", title: "Sessao" },
      {
        className: "Brancos",
        targets: [4],
        name: "Brancos",
        title: "Brancos / Nulos",
      },
      {
        className: "Bolsonaro",
        targets: [5],
        name: "Bolsonaro",
        title: "Bolsonaro",
      },
      { className: "Lular", targets: [6], name: "Lula", title: "Lula" },
    ],
    dom: "Bfrtip",
    buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
    processing: true,
    serverSide: true,
    ajax: "http://localhost:3001/filter",
    initComplete: () => {$("#table thead th input,select").on("change",(a) => {
        var e = $(a.target)
        updateSearch(e.attr("column"),e.val())
    });}
  });

  function updateSearch(column, value){
    table.columns(column).search(value);
    table.draw();
  }
  
});
