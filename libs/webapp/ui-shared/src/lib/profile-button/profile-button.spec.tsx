import { render } from '@testing-library/react';

import ProfileButton from './profile-button';

describe('ProfileButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileButton />);
    expect(baseElement).toBeTruthy();
  });
});
