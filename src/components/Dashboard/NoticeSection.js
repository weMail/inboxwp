import SignatureNotice from "./SignatureNotice";
import React from "@wordpress/element";

export default function NoticeSection({topText, children}) {
  return (
      <>
          <div className="inboxwp-w-full">
              <div className="inboxwp-w-32 inboxwp-mb-3">
                  <h2 className="inboxwp-text-lg">{topText}</h2>
              </div>

              {inboxwp.signatureAdded ? '' : <SignatureNotice/>}

                {children}
          </div>
      </>
  )
}