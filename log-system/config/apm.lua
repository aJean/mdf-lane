function set_rsc()
  local rsc = ngx.var.arg_lgRsc

  if ngx.var.request_method == "GET" then
    return ngx.unescape_uri(rsc)
  else
    return rsc
  end
end

return set_rsc();
