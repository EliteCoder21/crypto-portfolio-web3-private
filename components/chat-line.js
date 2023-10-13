import React from "react";
import Balancer from "react-wrap-balancer";

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props) => <Balancer {...props} />;

// util helper to convert new lines to <br /> tags
const convertNewLines = (text) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
    </span>
  ));

export function ChatLine({ role = "assistant", content }) {
  if (!content) {
    return null;
  }
  const formatteMessage = convertNewLines(content);

  return (
    <div className={role != "assistant" ? "float-right clear-both" : "float-left clear-both"}>
      <BalancerWrapper>
        <div className="border-zinc-100 lg:border float-right mb-4 rounded-lg bg-[#191c1e] p-3 shadow-lg ring-1 ring-zinc-100 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
              <p className="font-large text-xxl text-[#111926]">
                <a href="#" className="hover:underline text-white">
                  <strong>{role == "assistant" ? "AI" : "You"}</strong>
                </a>
              </p>
              <p
                className={"text text-gray-300 m-0 p-0"}
              >
                {formatteMessage}
              </p>
            </div>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  );
}