import { render } from '@testing-library/react';

import HelpDialog from './help-dialog';

describe('HelpDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HelpDialog />);
    expect(baseElement).toBeTruthy();
  });
});
