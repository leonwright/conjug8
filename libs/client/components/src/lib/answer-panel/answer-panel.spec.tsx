import { render } from '@testing-library/react';

import AnswerPanel from './answer-panel';

describe('AnswerPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AnswerPanel />);
    expect(baseElement).toBeTruthy();
  });
});
