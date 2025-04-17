function Welcome() {
  return (
    <div className="flex flex-col gap-6 absolute bottom-[40px]">
      <span className="text-[var(--color-white-max)] text-5xl font-semibold">
        Welcome to WORKHIVE!
      </span>
      <ul className="text-[var(--color-white-max)] text-sm font-normal leading-7 tracking-normal list-disc ml-5">
        <li>
          Employee Management: View detailed profiles, track performance, and
          manage attendance.
        </li>
        <li>
          Performance Insights: Analyze team goals, progress, and achievements.
        </li>
        <li>
          Attendance & Leaves: Track attendance patterns and manage leave
          requests effortlessly.
        </li>
      </ul>
    </div>
  );
}

export default Welcome;
