import SignatureNotice from "./SignatureNotice";
import React, {useEffect, useState} from "@wordpress/element";
import {Get} from "../../core/Ajax";

export default function NoticeSection({topText, children}) {
    const [signatureAdded, setSignatureAdded] = useState(true);

    useEffect(() => {
        const response = Get(`${inboxwp.ajaxurl}?action=inboxwp_check_signature_presence&hash=${inboxwp.hash}`);
        response.then((res) => {
            if (res.data.signature) {
                setSignatureAdded(true)
            } else {
                setSignatureAdded(false)
            }
        })
            .catch((err) => {
                console.log(err.response.data.message || 'Something went wrong')
            })
    }, [])

  return (
      <>
          <div className="inboxwp-w-full">
              <div className="inboxwp-w-32 inboxwp-mb-3">
                  <h2 className="inboxwp-text-lg">{topText}</h2>
              </div>

              {signatureAdded ? '' : <SignatureNotice/>}

                {children}
          </div>
      </>
  )
}