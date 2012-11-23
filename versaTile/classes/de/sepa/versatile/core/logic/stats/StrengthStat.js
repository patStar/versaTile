include('de.sepa.versatile.core.logic.Stat');

function StrengthStat(){}
StrengthStat.prototype = new Stat('strength');
StrengthStat.ID = 'StrengthStat';

function AgilityStat(){}
AgilityStat.prototype = new Stat('agility');
AgilityStat.ID = 'AgilityStat';

function IntelligenceStat(){}
IntelligenceStat.prototype = new Stat('intelligence');
IntelligenceStat.ID = 'IntelligenceStat';


function WisdomStat(){}
WisdomStat.prototype = new Stat('wisdom');
WisdomStat.ID = 'WisdomStat';