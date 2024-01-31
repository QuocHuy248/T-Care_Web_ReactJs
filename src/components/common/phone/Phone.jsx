import React from 'react';
import './phone.css';
import Swal from 'sweetalert2';

export default function Phone() {
  const handleCallNow = () => {
    Swal.fire({
      html: `
        <div style="text-align: left; display: flex;">
          <div style="flex: 1;">
            <p><strong>T-Care miền bắc:</strong></p>
            <p><strong>T-Care miền trung:</strong></p>
            <p><strong>T-Care miền nam:</strong></p>
          </div>
          <div style="flex: 1;">
            <p><span class="phone-number">${formatPhoneNumber('02347312999')}</span></p>
            <p><span class="phone-number">${formatPhoneNumber('02257312999')}</span></p>
            <p><span class="phone-number">${formatPhoneNumber('02827312999')}</span></p>
          </div>
        </div>
      `,
      confirmButtonText: 'OK',
    });
  };

  const formatPhoneNumber = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    return formattedNumber;
  };

  return (
    <div className="fix_tel">
      <div
        className="ring-alo-phone ring-alo-green ring-alo-show"
        id="ring-alo-phoneIcon"
        style={{ right: '150px', bottom: '-12px' }}
      >
        <div className="ring-alo-ph-circle"></div>
        <div className="ring-alo-ph-circle-fill"></div>
        <div className="ring-alo-ph-img-circle">
          <a onClick={handleCallNow}>
            <img
              className="lazy"
              src="https://codfe.com/wp-content/uploads/2020/08/call.png"
              alt="G"
            />
          </a>
        </div>
      </div>
      <div className="tel">
        <p className="fone"onClick={handleCallNow}>0225 731 2999</p>
      </div>
    </div>
  );
}