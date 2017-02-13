class Subscription < ApplicationRecord

  def status
    if self.active_until.past?
      return "expired"
    elsif self.canceled
      return "finishing_period"
    else
      return "valid"
    end
  end

  def valid
    return status != "expired"
  end

end
