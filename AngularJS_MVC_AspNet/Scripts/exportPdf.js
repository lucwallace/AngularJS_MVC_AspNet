function exportPDF() {

    var doc = new jsPDF();

    doc.autoTable({ html: '#tabela' });
    doc.text('Lista de usuários', 90, 10);

    doc.save('Lista de usuários.pdf')
}