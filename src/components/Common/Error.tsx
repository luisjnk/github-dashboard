import React from 'react';
import { ERROR_TEST_ID } from '../../utils/contants';

const Error = () => {
  return (
    <div 
    data-testid={ERROR_TEST_ID}
    className="EmptyTable">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentcolor"
        className="Icon Icon--IconWarning_outline"
        focusable="false">
        <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
        <path d="M0 0h24v24H0" fill="none"></path></svg>
      <div>
        <span>
          Something went wrong.
					</span>
      </div>
      <span>
        We're very sorry for any inconvenience you may have experienced.
						</span>
      <span>
        Please try again.
							</span>
    </div>)
}

export default Error;