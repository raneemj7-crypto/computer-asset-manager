import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Vitest does not expose global afterEach in this configuration, so
// Testing Library cannot register its automatic cleanup hook.
afterEach(() => {
  cleanup();
});
