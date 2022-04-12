import { ToTwelveHoursBasePipe } from './to-twelve-hours-base.pipe';

describe('ToTwelveHoursBasePipe', () => {
  it('create an instance', () => {
    const pipe = new ToTwelveHoursBasePipe();
    expect(pipe).toBeTruthy();
  });
});
