import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Table, Modal } from 'react-bootstrap';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const sendEmailWithInvoice = async (invoiceData) => {
  const canvas = await html2canvas(document.querySelector("#invoiceCapture"));
  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: [612, 792] });
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  // Generate PDF blob
  const pdfBlob = pdf.output('blob');

  // Prepare FormData for API request
  const formData = new FormData();
  formData.append("pdf", pdfBlob, "invoice-001.pdf");
  formData.append("invoiceData", JSON.stringify(invoiceData));

  // Make API request to send email
  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log("Invoice email sent successfully");
      alert("Invoice sent successfully!");
    } else {
      console.error("Error sending invoice email:", response.statusText);
      alert("Failed to send invoice. Please try again.");
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Failed to send invoice due to a network error.");
  }
};

const GenerateInvoice = () => {
  html2canvas(document.querySelector("#invoiceCapture")).then(canvas => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: [612, 792] });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice-001.pdf');
  });
};

const InvoiceModal = ({ showModal, closeModal, info, items, currency, total, subTotal, taxAmmount, sgstAmount, cgstAmount, discountAmmount, notes }) => (
  <Modal show={showModal} onHide={closeModal} size="lg" centered>
    <div id="invoiceCapture" className="p-4 bg-light">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h4 className="fw-bold my-2">{info.billFrom || 'John Uberbacher'}</h4>
          <h6 className="fw-bold text-secondary mb-1">Invoice #: {info.invoiceNumber || ''}</h6>
        </div>
        <div className="text-end">
          <h6 className="fw-bold mt-1 mb-2">Amount Due:</h6>
          <h5 className="fw-bold text-secondary">{currency} {total}</h5>
        </div>
      </div>
      <Row className="mb-4">
        <Col md={4}>
          <div className="fw-bold">Billed to:</div>
          <div>{info.billTo || ''}</div>
          <div>{info.billToAddress || ''}</div>
          <div>{info.billToEmail || ''}</div>
        </Col>
        <Col md={4}>
          <div className="fw-bold">Billed From:</div>
          <div>{info.billFrom || ''}</div>
          <div>{info.billFromAddress || ''}</div>
          <div>{info.billFromEmail || ''}</div>
        </Col>
        <Col md={4}>
          <div className="fw-bold mt-2">Date Of Issue:</div>
          <div>{info.dateOfIssue || ''}</div>
        </Col>
      </Row>
      <Table className="mb-0">
        <thead>
          <tr>
            <th>QTY</th>
            <th>DESCRIPTION</th>
            <th className="text-end">PRICE</th>
            <th className="text-end">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td style={{ width: '70px' }}>{item.quantity}</td>
              <td>{`${item.name} - ${item.description}`}</td>
              <td className="text-end" style={{ width: '100px' }}>{currency} {item.price}</td>
              <td className="text-end" style={{ width: '100px' }}>{currency} {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Table>
        <tbody>
          <tr className="text-end">
            <td></td>
            <td className="fw-bold">SUBTOTAL</td>
            <td className="text-end">{currency} {subTotal}</td>
          </tr>
          {taxAmmount !== 0.00 && (
            <tr className="text-end">
              <td></td>
              <td className="fw-bold">SGST</td>
              <td className="text-end">{currency} {sgstAmount}</td>
            </tr>
          )}
          {taxAmmount !== 0.00 && (
            <tr className="text-end">
              <td></td>
              <td className="fw-bold">CGST</td>
              <td className="text-end">{currency} {cgstAmount}</td>
            </tr>
          )}
          {discountAmmount !== 0.00 && (
            <tr className="text-end">
              <td></td>
              <td className="fw-bold">DISCOUNT</td>
              <td className="text-end">{currency} {discountAmmount}</td>
            </tr>
          )}
          <tr className="text-end">
            <td></td>
            <td className="fw-bold">TOTAL</td>
            <td className="text-end">{currency} {total}</td>
          </tr>
        </tbody>
      </Table>
      {notes && <div className="bg-light py-3 px-4 rounded">{notes}</div>}
    </div>
    <div className="pb-4 px-4">
      <Row>
        <Col md={6}>
          <Button variant="primary" className="d-block w-100" onClick={() => sendEmailWithInvoice({ info, items, currency, total })}>
            <BiPaperPlane className="me-2" /> Send Invoice
          </Button>
        </Col>
        <Col md={6}>
          <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
            <BiCloudDownload className="me-2" /> Download Copy
          </Button>
        </Col>
      </Row>
    </div>
  </Modal>
);

export default InvoiceModal;