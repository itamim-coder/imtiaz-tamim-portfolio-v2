"use client";

import { useRef, useState, type FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          _hp: honeypotRef.current?.value ?? "",
        }),
      });

      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Could not send your message.");
        return;
      }

      setStatus("success");
      setName("");
      setSubject("");
      setEmail("");
      setMessage("");
      if (honeypotRef.current) {
        honeypotRef.current.value = "";
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error — check your connection and try again.");
    }
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <form
      id="contact-form"
      className="narrative-form mt-10"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot — uncontrolled so autofill cannot block real submissions */}
      <input
        ref={honeypotRef}
        type="text"
        name="company_fax"
        defaultValue=""
        tabIndex={-1}
        autoComplete="off"
        data-1p-ignore
        data-lpignore="true"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
      />

      <div className="narrative-sentence font-display text-2xl font-semibold leading-relaxed tracking-tight text-foreground sm:text-3xl md:text-[2rem] md:leading-[1.65]">
        Hello, my name is{" "}
        <span className="input-wrap">
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="your name"
            value={name}
            disabled={isLoading}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="contact-name">Name</label>
        </span>{" "}
        and I&apos;d love to discuss{" "}
        <span className="input-wrap">
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            placeholder="a new project"
            value={subject}
            disabled={isLoading}
            onChange={(e) => setSubject(e.target.value)}
          />
          <label htmlFor="contact-subject">Subject</label>
        </span>
        .
        <br />
        <br />
        Reach me at{" "}
        <span className="input-wrap">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your email address"
            value={email}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="contact-email">Email</label>
        </span>{" "}
        to start.
        <br />
        <br />
        I want to say:
        <span className="input-wrap block-input">
          <textarea
            id="contact-message"
            name="message"
            rows={3}
            required
            placeholder="write your message here..."
            value={message}
            disabled={isLoading}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label htmlFor="contact-message">Message</label>
        </span>
      </div>

      <div className="narrative-footer mt-10 space-y-3">
        <button type="submit" className="narrative-btn" disabled={isLoading}>
          {isLoading
            ? "Sending…"
            : isSuccess
              ? "Message sent ✓"
              : "Send this message →"}
        </button>

        {status === "success" && (
          <p className="font-sans text-sm font-medium text-accent" role="status">
            Thanks — your message was sent. I&apos;ll reply soon.
          </p>
        )}

        {status === "error" && errorMessage && (
          <p className="font-sans text-sm font-medium text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
